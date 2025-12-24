"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Package,
  ShoppingCart,
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
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/inventory", icon: Package, label: "Inventory" },
    { href: "/prescription", icon: FileCheck, label: "Prescriptions" },
    { href: "/purchase", icon: ShoppingCart, label: "Purchase" },
    { href: "/supplier", icon: Building2, label: "Suppliers" },
    { href: "/report", icon: BarChart3, label: "Reports" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow border"
      >
        {isMobileOpen ? <X /> : <Menu />}
      </button>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "fixed inset-y-0 left-0 z-50" : "hidden md:flex"}
          flex-col bg-gray-50 dark:bg-gray-900 border-r transition-all
        `}
      >

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navigationItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                  ${
                    active
                      ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t space-y-2">
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
              text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <Menu className="h-5 w-5" />
            {!isCollapsed && <span>Collapse</span>}
          </button>

          {/* Profile */}
          <Link
            href="/profile"
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${
                pathname === "/profile"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
              }
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <User className="h-5 w-5" />
            {!isCollapsed && (
              <div className="leading-tight">
                <p className="font-medium">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">Pharmacist</p>
              </div>
            )}
          </Link>

          {/* Logout */}
          <button
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
              text-black-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
