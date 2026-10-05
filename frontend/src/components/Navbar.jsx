import React, { useState } from "react";
import { Button, Input } from "antd";
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-900 z-10 fixed top-0 w-full  p-4 text-white">
      <div className="flex w-full container ms-auto me-auto items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Bank Management</h1>
        </div>

        <div className="hidden md:block">
          <Button type="primary">Login</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
          {open ? <IoCloseOutline /> : <IoReorderThreeOutline />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "block" : "hidden"
        } mt-4 border-t border-slate-700 pt-4 md:hidden`}
      >
        {/* Mobile Login */}
        <div className="mt-4">
          <Button type="primary" className="w-full">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
