import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  employeeApi,
  formatCurrency,
  salaryApi,
  type Employee,
  type Salary,
} from "../lib/api";

export default function SalaryPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [basicSalary, setBasicSalary] = useState("0");
  const [allowance, setAllowance] = useState("0");
  const [deductions, setDeductions] = useState("0");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const netSalary = useMemo(
    () =>
      Number(basicSalary || 0) + Number(allowance || 0) - Number(deductions || 0),
    [basicSalary, allowance, deductions]
  );

  const selectedSalary = salaries.find(
    (salary) => salary.employeeId === Number(employeeId)
  );

  const loadData = async () => {
    setLoading(true);
    const [employeeResponse, salaryResponse] = await Promise.all([
      employeeApi.getAll(),
      salaryApi.getAll(),
    ]);

    if (employeeResponse.data.status === "success" && employeeResponse.data.employees) {
      setEmployees(employeeResponse.data.employees);
    }

    if (salaryResponse.data.status === "success" && salaryResponse.data.salaries) {
      setSalaries(salaryResponse.data.salaries);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!employeeId) return;

    const salary = salaries.find((item) => item.employeeId === Number(employeeId));

    if (salary) {
      setBasicSalary(String(salary.basicSalary));
      setAllowance(String(salary.allowance));
      setDeductions(String(salary.deductions));
    } else {
      setBasicSalary("0");
      setAllowance("0");
      setDeductions("0");
    }
  }, [employeeId, salaries]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const payload = {
      employeeId: Number(employeeId),
      basicSalary: Number(basicSalary),
      allowance: Number(allowance),
      deductions: Number(deductions),
    };

    const { data } = selectedSalary
      ? await salaryApi.update(payload)
      : await salaryApi.add(payload);

    if (data.status === "success") {
      setMessage(
        selectedSalary ? "Salary updated successfully." : "Salary added successfully."
      );
      await loadData();
    } else {
      setError(data.message || "Unable to save salary");
    }

    setSubmitting(false);
  };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Compensation</p>
          <h2>Salary Management</h2>
        </div>
      </header>

      <div className="page-grid">
        <form className="panel form-grid" onSubmit={handleSubmit}>
          <h3>{selectedSalary ? "Update Salary" : "Set Salary"}</h3>

          <label>
            Employee
            <select
              value={employeeId}
              onChange={(event) => setEmployeeId(event.target.value)}
              required
            >
              <option value="">Select employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.fullName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Basic Salary
            <input
              type="number"
              min="0"
              step="0.01"
              value={basicSalary}
              onChange={(event) => setBasicSalary(event.target.value)}
              required
            />
          </label>

          <label>
            Allowance
            <input
              type="number"
              min="0"
              step="0.01"
              value={allowance}
              onChange={(event) => setAllowance(event.target.value)}
              required
            />
          </label>

          <label>
            Deductions
            <input
              type="number"
              min="0"
              step="0.01"
              value={deductions}
              onChange={(event) => setDeductions(event.target.value)}
              required
            />
          </label>

          <div className="summary-box">
            <span>Net Salary</span>
            <strong>{formatCurrency(netSalary)}</strong>
            <small>Basic Salary + Allowance - Deductions</small>
          </div>

          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting
              ? "Saving..."
              : selectedSalary
                ? "Update Salary"
                : "Save Salary"}
          </button>
        </form>

        <div className="panel table-panel">
          <div className="panel-header">
            <h3>Salary Records</h3>
            <span>{salaries.length} records</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Basic Salary</th>
                  <th>Allowance</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5}>Loading salary records...</td>
                  </tr>
                ) : salaries.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No salary records yet.</td>
                  </tr>
                ) : (
                  salaries.map((salary) => (
                    <tr key={salary.id}>
                      <td>{salary.employeeName}</td>
                      <td>{formatCurrency(salary.basicSalary)}</td>
                      <td>{formatCurrency(salary.allowance)}</td>
                      <td>{formatCurrency(salary.deductions)}</td>
                      <td>{formatCurrency(salary.netSalary)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
