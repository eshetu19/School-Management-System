import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0f172a_0%,rgba(59,130,246,0.18)_40%,rgba(79,70,229,0.95)_100%)] text-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-4xl bg-white/10 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              Student Management System
            </h1>
            <p className="text-slate-200 mt-3">
              Managing Education, Empowering Futures
            </p>
          </div>
          <Outlet />
          <footer className="text-center mt-12 text-slate-300 text-sm">
            &copy; {new Date().getFullYear()} Student Management System. All
            rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
