import { useState } from "react";
const Navbar = ({ user, role, onLogout, onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="backdrop-blur-xl bg-slate-950/92 border-b border-slate-800 fixed inset-x-0 top-0 z-40 shadow-2xl shadow-slate-950/30">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden rounded-2xl border border-slate-700 bg-slate-900/70 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white hover:bg-slate-800/80 shadow-sm"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">
              Student Management
            </h1>
            <p className="text-sm text-slate-400">
              Attendance, grades, and registration in one dashboard
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200 transition hover:border-slate-500"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white shadow-md shadow-blue-500/20">
              {user?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden flex-col text-left sm:flex">
              <span className="text-sm text-slate-100">{user}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {role}
              </span>
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/20">
              <button
                onClick={onLogout}
                className="w-full px-4 py-3 text-left text-sm text-rose-400 transition hover:bg-slate-900"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
