import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
  <nav
    className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-slate-500 lg:py-4"
    data-twe-navbar-ref
  >
    <div className="flex w-full flex-wrap items-center justify-between px-3">
      <div className="flex items-center">
        <a href="#" className="flex items-center">
          <img src={Logo} alt="" style={{ height: "50px" }} className="mr-2" />
          <span
            className="font-serif font-normal"
            style={{ color: "white", fontStyle: "bold", fontSize: "23px" }}
          >
            Furry pet clinic
          </span>
        </a>
      </div>
      <div
        className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
        id="navbarSupportedContent4"
        data-twe-collapse-item
      >
        <ul
          className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
          data-twe-navbar-nav-ref
        ></ul>
        <a href="#" className="hover-text">
          <div className="flex items-center">
            <Link to="/Home">
              {" "}
              <span className="font-serif hover-text__inner">Home</span>
            </Link>
          </div>
        </a>

        <div className="flex items-center pl-5">
          <button
            type="button"
            className="dark:text-gray-100 font-serif font-light me-3 bg-primary px-6 pb-2 pt-2.5 text-xs font-light font-semibold leading-normal text-white hover:bg-blue-400 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong rounded-2xl"
          >
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  </nav>;
};

export default Navbar;
