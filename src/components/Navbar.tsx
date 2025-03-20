"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center">
            <Image
              className="mr-2"
              src="/jesus.png"
              width={50}
              height={50}
              alt="Divine Sight"
            />
            Divine Sight
          </Link>

          <div className="flex items-center space-x-2 md:space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/bible"
                  className={`hover:text-purple-200 transition-colors ${
                    pathname.startsWith("/bible")
                      ? "text-purple-200 font-medium"
                      : ""
                  }`}
                >
                  Bíblia
                </Link>
                <Link
                  href="/search"
                  className={`hover:text-purple-200 transition-colors ${
                    pathname.startsWith("/search")
                      ? "text-purple-200 font-medium"
                      : ""
                  }`}
                >
                  Buscar
                </Link>
                <Link
                  href="/analysis"
                  className={`hover:text-purple-200 transition-colors ${
                    pathname.startsWith("/analysis")
                      ? "text-purple-200 font-medium"
                      : ""
                  }`}
                >
                  Análise
                </Link>
                <div className="border-l border-purple-700 h-6 mx-2"></div>
                <span className="text-sm hidden md:inline">{user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-secondary hover:opacity-60 px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`hover:text-purple-200 transition-colors ${
                    pathname === "/auth/login"
                      ? "text-purple-200 font-medium"
                      : ""
                  }`}
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-secondary hover:opacity-90 px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
