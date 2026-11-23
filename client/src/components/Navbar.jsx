import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import Icon from "./Icon";

const linkClass = ({ isActive }) =>
  `inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
    isActive ? "bg-brand-50 text-brand-800" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2"
    >
      Skip to content
    </a>
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <Link to="/view" className="flex items-center gap-3 rounded-lg">
        <img src={Logo} alt="" width="40" height="40" className="h-10 w-10" />
        <span className="text-lg font-bold tracking-tight text-slate-900">
          Furry Pets <span className="hidden font-medium text-slate-500 sm:inline">Clinic</span>
        </span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-1">
        <NavLink to="/view" className={linkClass}>Records</NavLink>
        <Link to="/add" className="btn-primary ml-2">
          <Icon name="plus" className="h-4 w-4" />
          <span className="hidden sm:inline">Add pet</span>
          <span className="sr-only sm:hidden">Add pet</span>
        </Link>
      </nav>
    </div>
  </header>
);

export default Navbar;
