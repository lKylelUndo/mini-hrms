import { useEffect, useState } from "react";
import { dashboardApi, formatCurrency, type DashboardStats } from "../lib/api";

const defaultStats: DashboardStats = {
  totalEmployees: 0,
  activeEmployees: 0,
  onLeaveEmployees: 0,
  totalMonthlyPayroll: 0,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const { data } = await dashboardApi.getStats();

      if (data.status === "success" && data.stats) {
        setStats(data.stats);
        setError("");
      } else {
        setError(data.message || "Unable to load dashboard stats");
      }

      setLoading(false);
    };

    loadStats();
  }, []);

  const cards = [
    { label: "Total Employees", value: stats.totalEmployees },
    { label: "Active Employees", value: stats.activeEmployees },
    { label: "Employees on Leave", value: stats.onLeaveEmployees },
    {
      label: "Total Monthly Payroll",
      value: formatCurrency(stats.totalMonthlyPayroll),
    },
  ];

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Dashboard</h2>
        </div>
      </header>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="stats-grid">
        {cards.map((card) => (
          <article key={card.label} className="stat-card">
            <p>{card.label}</p>
            <strong>{loading ? "..." : card.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
