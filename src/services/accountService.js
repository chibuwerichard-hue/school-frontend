// Initialize default accounts in localStorage
export const initializeAccounts = () => {
  const existingAccounts = localStorage.getItem("systemAccounts");
  if (!existingAccounts) {
    const defaultAccounts = [
      { id: 1, name: "Admin User", email: "admin@school.com", role: "ADMIN", grade: "N/A", password: "Admin@123", createdDate: "2026-01-01" },
      { id: 2, name: "Teacher", email: "teacher@gmail.com", role: "TEACHER", grade: "Grade 10A", password: "Admin@123", createdDate: "2026-01-15" },
      { id: 3, name: "Finance Officer", email: "finance@school.com", role: "FINANCE_OFFICER", grade: "N/A", password: "Admin@123", createdDate: "2026-01-20" },
      { id: 4, name: "Sports Coordinator", email: "sports@school.com", role: "SPORTS_COORDINATOR", grade: "N/A", password: "Admin@123", createdDate: "2026-01-22" }
    ];
    localStorage.setItem("systemAccounts", JSON.stringify(defaultAccounts));
  }
};

// Get all accounts
export const getAllAccounts = () => {
  const accounts = localStorage.getItem("systemAccounts");
  return accounts ? JSON.parse(accounts) : [];
};

// Create new account
export const createAccount = (accountData) => {
  const accounts = getAllAccounts();
  const newAccount = {
    id: Math.max(...accounts.map(a => a.id), 0) + 1,
    ...accountData,
    createdDate: new Date().toISOString().split('T')[0]
  };
  accounts.push(newAccount);
  localStorage.setItem("systemAccounts", JSON.stringify(accounts));
  return newAccount;
};

// Verify login
export const verifyLogin = (email, password) => {
  const accounts = getAllAccounts();
  const account = accounts.find(a => a.email === email && a.password === password);
  return account || null;
};

// Delete account
export const deleteAccount = (id) => {
  const accounts = getAllAccounts();
  const filtered = accounts.filter(a => a.id !== id);
  localStorage.setItem("systemAccounts", JSON.stringify(filtered));
};

// Get account by email
export const getAccountByEmail = (email) => {
  const accounts = getAllAccounts();
  return accounts.find(a => a.email === email) || null;
};
