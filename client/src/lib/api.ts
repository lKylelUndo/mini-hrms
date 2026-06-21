const API_BASE = import.meta.env.VITE_API_URL || "/api";

type ApiOptions = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | number | undefined>;
};

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}) {
  const { method = "GET", body, query } = options;

  let url = `${API_BASE}${endpoint}`;

  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data: data as T };
}

export type ApiResponse = {
  status: string;
  code: number;
  message: string;
};

export type Employee = {
  id: number;
  fullName: string;
  email: string;
  contactNumber: string;
  position: string;
  department: string;
  dateHired: string;
  employmentStatus: "ACTIVE" | "RESIGNED" | "ON LEAVE";
};

export type Salary = {
  id: number;
  employeeId: number;
  employeeName: string;
  basicSalary: number;
  allowance: number;
  deductions: number;
  netSalary: number;
};

export type Attendance = {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  status: "PRESENT" | "LATE" | "ABSENT" | "ON LEAVE";
};

export type Payroll = {
  id: number;
  employeeId: number;
  employeeName: string;
  basicSalary: number;
  allowance: number;
  deductions: number;
  netSalary: number;
  payrollDate: string;
};

export type DashboardStats = {
  totalEmployees: number;
  activeEmployees: number;
  onLeaveEmployees: number;
  totalMonthlyPayroll: number;
};

export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<ApiResponse & { user: { id: number; email: string } }>(
      "/auth/v1/login",
      { method: "POST", body: { email, password } }
    ),
};

export const employeeApi = {
  getAll: () =>
    apiRequest<ApiResponse & { employees: Employee[] }>("/employee/v1/all-employee"),
  view: (id: number) =>
    apiRequest<ApiResponse & { employee: Employee }>("/employee/v1/view-employee", {
      method: "POST",
      body: { id },
    }),
  add: (employee: Omit<Employee, "id">) =>
    apiRequest<ApiResponse & { employeeId: number }>("/employee/v1/add-employee", {
      method: "POST",
      body: employee,
    }),
  edit: (employee: Partial<Employee> & { id: number }) =>
    apiRequest<ApiResponse & { employee: Employee }>("/employee/v1/edit-employee", {
      method: "PUT",
      body: employee,
    }),
  remove: (id: number) =>
    apiRequest<ApiResponse>("/employee/v1/delete-employee", {
      method: "DELETE",
      body: { id },
    }),
};

export const salaryApi = {
  getAll: () =>
    apiRequest<ApiResponse & { salaries: Salary[] }>("/salary/v1/all-salary"),
  add: (payload: {
    employeeId: number;
    basicSalary: number;
    allowance: number;
    deductions: number;
  }) =>
    apiRequest<ApiResponse & { salary: Salary }>("/salary/v1/add-salary", {
      method: "POST",
      body: payload,
    }),
  update: (payload: {
    employeeId: number;
    basicSalary: number;
    allowance: number;
    deductions: number;
  }) =>
    apiRequest<ApiResponse & { salary: Salary }>("/salary/v1/update-salary", {
      method: "PUT",
      body: payload,
    }),
};

export const attendanceApi = {
  getAll: () =>
    apiRequest<ApiResponse & { attendance: Attendance[] }>(
      "/attendance/v1/all-attendance"
    ),
  record: (payload: {
    employeeId: number;
    date: string;
    timeIn?: string | null;
    timeOut?: string | null;
    status: Attendance["status"];
  }) =>
    apiRequest<ApiResponse & { attendance: Attendance }>(
      "/attendance/v1/record-attendance",
      { method: "POST", body: payload }
    ),
};

export const payrollApi = {
  getSummary: (month?: number, year?: number) =>
    apiRequest<ApiResponse & { payroll: Payroll[] }>("/payroll/v1/summary", {
      query: { month, year },
    }),
  generate: (month?: number, year?: number) =>
    apiRequest<ApiResponse & { payroll: Payroll[] }>("/payroll/v1/generate-payroll", {
      method: "POST",
      body: { month, year },
    }),
};

export const dashboardApi = {
  getStats: () =>
    apiRequest<ApiResponse & { stats: DashboardStats }>("/dashboard/v1/stats"),
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

export const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
