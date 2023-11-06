import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-primary text-primary-content sticky top-0 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Usermetrics
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="font-bold" href="/">
              Posts
            </Link>
          </li>
          <li>
            <Link className="font-bold" href="/dashboards">
              Dashboards
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
