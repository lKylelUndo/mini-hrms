export const computeNetSalary = (
  basicSalary: number,
  allowance: number,
  deductions: number
) => Number((basicSalary + allowance - deductions).toFixed(2));
