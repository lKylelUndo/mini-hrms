import { useEffect, useState, type FormEvent } from "react";
import {
  attendanceApi,
  employeeApi,
  formatDate,
  type Attendance,
  type Employee,
} from "../lib/api";

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<Attendance[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [status, setStatus] = useState<Attendance["status"]>("PRESENT");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    const [employeeResponse, attendanceResponse] = await Promise.all([
      employeeApi.getAll(),
      attendanceApi.getAll(),
    ]);

    if (employeeResponse.data.status === "success" && employeeResponse.data.employees) {
      setEmployees(employeeResponse.data.employees);
    }

    if (
      attendanceResponse.data.status === "success" &&
      attendanceResponse.data.attendance
    ) {
      setRecords(attendanceResponse.data.attendance);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const { data } = await attendanceApi.record({
      employeeId: Number(employeeId),
      date,
      timeIn: timeIn || null,
      timeOut: timeOut || null,
      status,
    });

    if (data.status === "success") {
      setMessage("Attendance recorded successfully.");
      await loadData();
    } else {
      setError(data.message || "Unable to record attendance");
    }

    setSubmitting(false);
  };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h2>Attendance Management</h2>
        </div>
      </header>

      <div className="page-grid">
        <form className="panel form-grid" onSubmit={handleSubmit}>
          <h3>Record Attendance</h3>

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
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>

          <label>
            Time In
            <input
              type="time"
              value={timeIn}
              onChange={(event) => setTimeIn(event.target.value)}
            />
          </label>

          <label>
            Time Out
            <input
              type="time"
              value={timeOut}
              onChange={(event) => setTimeOut(event.target.value)}
            />
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as Attendance["status"])
              }
            >
              <option value="PRESENT">Present</option>
              <option value="LATE">Late</option>
              <option value="ABSENT">Absent</option>
              <option value="ON LEAVE">On Leave</option>
            </select>
          </label>

          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Saving..." : "Record Attendance"}
          </button>
        </form>

        <div className="panel table-panel">
          <div className="panel-header">
            <h3>Attendance Records</h3>
            <span>{records.length} records</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5}>Loading attendance records...</td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No attendance records yet.</td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id}>
                      <td>{record.employeeName}</td>
                      <td>{formatDate(record.date)}</td>
                      <td>{record.timeIn || "-"}</td>
                      <td>{record.timeOut || "-"}</td>
                      <td>
                        <span className={`badge badge-${record.status.toLowerCase().replace(" ", "-")}`}>
                          {record.status}
                        </span>
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
