"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  FileCheck,
  Menu,
  X,
  Building2,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const event = new CustomEvent("sidebarWidthChange", {
      detail: { width: isCollapsed ? 64 : 256 },
    });
    window.dispatchEvent(event);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    if (window.innerWidth >= 768) {
      const event = new CustomEvent("sidebarWidthChange", {
        detail: { width: newCollapsedState ? 64 : 256 },
      });
      window.dispatchEvent(event);
    }
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navigationItems = [
    {
      href: "/",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/inventory",
      icon: Package,
      label: "Inventory",
    },
    {
      href: "/invoices",
      icon: FileCheck,
      label: "Invoice",
    },
    // {
    //   href: "/prescription",
    //   icon: FileCheck,
    //   label: "Prescriptions",
    // },
    // {
    //   href: "/customer",
    //   icon: Users,
    //   label: "Customers",
    // },
    {
      href: "/purchase",
      icon: ShoppingCart,
      label: "Purchase",
    },
    {
      href: "/supplier",
      icon: Building2,
      label: "Suppliers",
    },
    {
      href: "/report",
      icon: BarChart3,
      label: "Reports",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        ${isMobileOpen ? "fixed" : "hidden md:block"}
        top-0 left-0 h-screen z-50 md:z-auto
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 truncate">
                  My Pharmacy
                </h1>
              )}

              <button
                onClick={toggleCollapse}
                className="hidden md:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    }
                    ${isCollapsed ? "justify-center" : "justify-start"}
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${isCollapsed ? "" : "mr-3"}`}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {isCollapsed && (
                    <div className="absolute left-16 px-2 py-1 ml-2 text-xs bg-gray-900 dark:bg-gray-700 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer with Collapse, Profile, and Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-2">

            {/* Profile Link */}
            <Link
              href="/profile"
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${
                  pathname === "/profile"
                    ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <User className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground truncate">Pharmacist</p>
                </div>
              )}
            </Link>

            {/* Logout Button */}
            <button
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
