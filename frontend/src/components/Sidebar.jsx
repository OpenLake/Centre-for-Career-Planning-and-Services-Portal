// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LogoutButton from "../pages/auth/LogoutButton";
import { useAuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!authUser) return null;

  const navLinkClass = ({ isActive }) =>
    `block px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
      ? "bg-[#13665b] dark:bg-gray-800 text-white font-semibold"
      : "text-white hover:bg-[#13665b] dark:hover:bg-gray-800 hover:text-white"
    }`;

  const navItems = (
    <>
      <NavLink to="/home" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/analytics" className={navLinkClass}>
        Analytics
      </NavLink>
      <NavLink to="/alumni" className={navLinkClass}>
        Alumni
      </NavLink>

      {authUser.role === "student" && (
        <>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
          <NavLink to="/applications" className={navLinkClass}>
            Applications
          </NavLink>
          <NavLink to="/saved-applications" className={navLinkClass}>
            Saved Apps
          </NavLink>
          <NavLink to="/referrals" className={navLinkClass}>
            Referrals
          </NavLink>
          <NavLink to="/resumebuilder" className={navLinkClass}>
            Resume Builder
          </NavLink>
          <NavLink to="/discussion-forum" className={navLinkClass}>
            Discussion Forum
          </NavLink>
        </>
      )}

      {authUser.role === "admin" && (
        <>
          <NavLink to="/admin/create-job" className={navLinkClass}>
            Create Job
          </NavLink>
          <NavLink to="/admin/manage-jobs" className={navLinkClass}
          >Manage Job
          </NavLink>
          <NavLink to="/admin/add-alumni" className={navLinkClass}>
            Add Alumni
          </NavLink>
        </>
      )}

      {authUser.role === "alumni" && (
        <>
          <NavLink to="/alumni/requests" className={navLinkClass}>
            Incoming Requests
          </NavLink>
          <NavLink to="/alumni/connections" className={navLinkClass}>
            Connections
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      {/* MOBILE/TABLET TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0fa18e] dark:bg-gray-900 text-white px-4 flex items-center justify-between z-20 shadow-md">
        <NavLink to="/" className="flex items-center">
          <img src="/images/CCPS.png" alt="Logo" className="h-10 w-10" />
          <span className="ml-2 flex flex-col justify-center">
            <span className="text-lg font-semibold font-montserrat text-white leading-none">
              CCPS
            </span>
            <span className="text-[10px] font-bold text-white leading-none mt-0.5">
              ({authUser.role})
            </span>
          </span>
        </NavLink>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="p-2 rounded hover:bg-[#13665b] dark:hover:bg-gray-800 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      {/* MOBILE/TABLET OVERLAY */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE/TABLET DRAWER */}
      <div
        className={`md:hidden fixed top-16 left-0 w-64 bg-[#0fa18e] dark:bg-gray-900 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] transition-transform duration-300 z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          <div
            className="overflow-y-auto flex-1 space-y-1 py-4"
            onClick={() => setIsOpen(false)}
          >
            {navItems}
          </div>
          <div className="px-6 pb-4">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-[#0fa18e] dark:bg-gray-900 flex-col justify-between py-6 shadow-md z-10">
        <div>
          <NavLink to="/" className="flex items-center px-6 mb-8">
            <img src="/images/CCPS.png" alt="Logo" className="h-10 w-10" />
            <span className="ml-3 flex flex-col">
              <span className="text-2xl font-semibold font-montserrat text-white">
                CCPS
              </span>
              <span className="text-xs font-bold text-white">
                ({authUser.role})
              </span>
            </span>
          </NavLink>

          <nav className="flex flex-col space-y-1 overflow-y-auto">
            {navItems}
          </nav>
        </div>
        <div className="px-6 pb-4 flex items-center justify-between gap-2">
          <div className="flex-1">
            <LogoutButton />
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* PAGE CONTENT */}
      <main className="md:pl-64 pt-16 bg-gray-50 dark:bg-black min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default Sidebar;
