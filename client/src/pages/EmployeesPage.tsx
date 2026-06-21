import { useEffect, useState, type FormEvent } from "react";
import {
  employeeApi,
  formatDate,
  type Employee,
} from "../lib/api";

const emptyForm = {
  fullName: "",
  email: "",
  contactNumber: "",
  position: "",
  department: "",
  dateHired: "",
  employmentStatus: "ACTIVE" as Employee["employmentStatus"],
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadEmployees = async () => {
    setLoading(true);
    const { data } = await employeeApi.getAll();

    if (data.status === "success" && data.employees) {
      setEmployees(data.employees);
      setError("");
    } else {
      setError(data.message || "Unable to load employees");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const payload = {
      ...form,
      dateHired: new Date(form.dateHired).toISOString(),
    };

    const { data } = editingId
      ? await employeeApi.edit({ id: editingId, ...payload })
      : await employeeApi.add(payload);

    if (data.status === "success") {
      setMessage(editingId ? "Employee updated successfully." : "Employee added successfully.");
      resetForm();
      await loadEmployees();
    } else {
      setError(data.message || "Unable to save employee");
    }

    setSubmitting(false);
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setForm({
      fullName: employee.fullName,
      email: employee.email,
      contactNumber: employee.contactNumber,
      position: employee.position,
      department: employee.department,
      dateHired: employee.dateHired.slice(0, 10),
      employmentStatus: employee.employmentStatus,
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this employee?")) return;

    const { data } = await employeeApi.remove(id);

    if (data.status === "success") {
      setMessage("Employee deleted successfully.");
      if (editingId === id) resetForm();
      await loadEmployees();
    } else {
      setError(data.message || "Unable to delete employee");
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">People</p>
          <h2>Employee Management</h2>
        </div>
      </header>

      <div className="page-grid">
        <form className="panel form-grid" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Employee" : "Add Employee"}</h3>

          <label>
            Full Name
            <input
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>

          <label>
            Contact Number
            <input
              value={form.contactNumber}
              onChange={(event) =>
                setForm({ ...form, contactNumber: event.target.value })
              }
              required
            />
          </label>

          <label>
            Position
            <input
              value={form.position}
              onChange={(event) => setForm({ ...form, position: event.target.value })}
              required
            />
          </label>

          <label>
            Department
            <input
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
              required
            />
          </label>

          <label>
            Date Hired
            <input
              type="date"
              value={form.dateHired}
              onChange={(event) => setForm({ ...form, dateHired: event.target.value })}
              required
            />
          </label>

          <label>
            Employment Status
            <select
              value={form.employmentStatus}
              onChange={(event) =>
                setForm({
                  ...form,
                  employmentStatus: event.target.value as Employee["employmentStatus"],
                })
              }
            >
              <option value="ACTIVE">Active</option>
              <option value="RESIGNED">Resigned</option>
              <option value="ON LEAVE">On Leave</option>
            </select>
          </label>

          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}

          <div className="button-row">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : editingId ? "Update Employee" : "Add Employee"}
            </button>
            {editingId ? (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="panel table-panel">
          <div className="panel-header">
            <h3>Employee List</h3>
            <span>{employees.length} records</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Date Hired</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8}>Loading employees...</td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan={8}>No employees found.</td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.fullName}</td>
                      <td>{employee.email}</td>
                      <td>{employee.position}</td>
                      <td>{employee.department}</td>
                      <td>{formatDate(employee.dateHired)}</td>
                      <td>
                        <span className={`badge badge-${employee.employmentStatus.toLowerCase().replace(" ", "-")}`}>
                          {employee.employmentStatus}
                        </span>
                      </td>
                      <td className="table-actions">
                        <button
                          type="button"
                          className="btn btn-small"
                          onClick={() => handleEdit(employee)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-small btn-danger"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
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
