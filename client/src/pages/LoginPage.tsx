import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { data } = await authApi.login(email, password);

    if (data.status === "success" && data.user) {
      login(data.user);
      navigate("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="brand-mark">HR</span>
          <div>
            <h1>Mini HRMS</h1>
            <p>Sign in to manage employees, payroll, and attendance.</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-hint">Demo credentials: admin@test.com / admin123</p>
      </div>
    </div>
  );
}
