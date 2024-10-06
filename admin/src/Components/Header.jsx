// src/Components/Header.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { admin, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">
        Admin Panel
      </Link>
      {admin && (
        <div className="flex items-center space-x-4">
          <span>{admin.adminName}</span>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
