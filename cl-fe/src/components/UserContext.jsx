import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Cek localStorage saat inisialisasi
  const getUserFromStorage = () => {
    const token = localStorage.getItem("token");
    const usn = localStorage.getItem("usn");
    const email = localStorage.getItem("email");
    if (token && (usn || email)) return { token, usn, email };
    return null;
  };
  const [user, setUser] = useState(getUserFromStorage());

  // On mount, rehydrate user state from localStorage
  useEffect(() => {
    setUser(getUserFromStorage());
    const syncUser = () => {
      setUser(getUserFromStorage());
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // Fungsi untuk login/logout
  const login = (data) => {
    // Ambil data lama dari localStorage jika tidak dikirim dari backend
    const prev = getUserFromStorage() || {};
    const token = data.token || prev.token || null;
    const usn = data.usn || prev.usn || null;
    const email = data.email || prev.email || null;
    if (token) localStorage.setItem("token", token);
    if (usn) localStorage.setItem("usn", usn);
    if (email) localStorage.setItem("email", email);
    setUser({ token, usn, email });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usn");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
