import { useEffect, useState } from "react";
import { formatCurrency, formatDate, payrollApi, type Payroll } from "../lib/api";

export default function PayrollPage() {
  const [records, setRecords] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadPayroll = async () => {
    setLoading(true);
    const { data } = await payrollApi.getSummary();

    if (data.status === "success" && data.payroll) {
      setRecords(data.payroll);
      setError("");
    } else {
      setError(data.message || "Unable to load payroll summary");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPayroll();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    setMessage("");

    const { data } = await payrollApi.generate();

    if (data.status === "success") {
      setMessage("Payroll generated for the current month.");
      setRecords(data.payroll || []);
    } else {
      setError(data.message || "Unable to generate payroll");
    }

    setGenerating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalNet = records.reduce((sum, record) => sum + record.netSalary, 0);

  return (
    <section className="page payroll-page">
      <header className="page-header no-print">
        <div>
          <p className="eyebrow">Finance</p>
          <h2>Payroll Summary</h2>
        </div>
        <div className="button-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? "Generating..." : "Generate Payroll"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handlePrint}>
            Print Summary
          </button>
        </div>
      </header>

      {error ? <p className="form-error no-print">{error}</p> : null}
      {message ? <p className="form-success no-print">{message}</p> : null}

      <div className="panel table-panel printable-area">
        <div className="panel-header">
          <h3>Monthly Payroll Summary</h3>
          <span>{records.length} records</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Basic Salary</th>
                <th>Allowance</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Payroll Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>Loading payroll summary...</td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    No payroll records yet. Generate payroll after setting employee salaries.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.employeeName}</td>
                    <td>{formatCurrency(record.basicSalary)}</td>
                    <td>{formatCurrency(record.allowance)}</td>
                    <td>{formatCurrency(record.deductions)}</td>
                    <td>{formatCurrency(record.netSalary)}</td>
                    <td>{formatDate(record.payrollDate)}</td>
                  </tr>
                ))
              )}
            </tbody>
            {records.length > 0 ? (
              <tfoot>
                <tr>
                  <td colSpan={4}>Total Net Payroll</td>
                  <td colSpan={2}>{formatCurrency(totalNet)}</td>
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
      </div>
    </section>
  );
}
