import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
  if (!email || !password) {
    throw new Error("Email y contraseña son requeridos");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  let userFound = users.find(u => u.email === email);

  if (!userFound) {
    // registrar automáticamente
    userFound = { email, password, name: email.split("@")[0] };
    users.push(userFound);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    if (userFound.password !== password) {
      throw new Error("Contraseña incorrecta");
    }
  }

  setUser(userFound);
  localStorage.setItem("user", JSON.stringify(userFound));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
