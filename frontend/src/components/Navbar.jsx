import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";
import axios from "axios";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginState = () => {
      setIsLoggedIn(localStorage.getItem("login") === "true");
    };

    updateLoginState();
    window.addEventListener("auth-change", updateLoginState);

    return () => {
      window.removeEventListener("auth-change", updateLoginState);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios
        .get("/api/v1/user/logout", { withCredentials: true })
        .then((res) => console.log(res));
      localStorage.removeItem("login");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Ant Design Dropdown Menu items for profile
  const userMenuItems = [
    {
      key: "manage-account",
      icon: <SettingOutlined />,
      label: <Link to="/manageAccount">Manage Account</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="bg-slate-900 z-50 fixed top-0 w-full px-6 py-4 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:text-slate-200 transition-colors"
        >
          Bank Management
        </Link>

        {/* Desktop Menu - Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 py-1.5 px-3 rounded-full transition-colors border border-slate-700">
                <Avatar icon={<UserOutlined />} className="bg-blue-600" />
                <span className="text-sm font-medium pr-1">Account</span>
              </div>
            </Dropdown>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          aria-label="Toggle Navigation Menu"
          className="text-3xl md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <IoCloseOutline /> : <IoReorderThreeOutline />}
        </button>
      </div>

      {/* Mobile Menu Container */}
      {open && (
        <div className="md:hidden mt-4 border-t border-slate-800 pt-4 pb-2 px-2 flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 text-slate-300">
                <Avatar icon={<UserOutlined />} className="bg-blue-600" />
                <span className="font-semibold text-white">My Account</span>
              </div>
              <Link
                to="/manageAccount"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm"
              >
                <SettingOutlined />
                <span>Manage Account</span>
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm text-left w-full"
              >
                <LogoutOutlined />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 rounded-lg text-sm transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
