import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FooterC, UserSidebar } from "../components";
import { FiMenu, FiX } from "react-icons/fi";

function User() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-24 flex">
      {/* Sidebar for large devices */}
      <div className="hidden md:block w-64">
        <UserSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <UserSidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4">
        {/* Menu Button only on small screens */}
        <button
          className="md:hidden mb-4 p-2 rounded-md bg-gray-200"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={24} />
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default User;
