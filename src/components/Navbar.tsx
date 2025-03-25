"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
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
                <span className="text-sm">{user?.name}</span>
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

          {/* Hamburger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-20"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-primary z-10 md:hidden transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } pt-20`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/bible"
                className={`py-2 text-center text-lg ${
                  pathname.startsWith("/bible")
                    ? "text-purple-200 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Bíblia
              </Link>
              <Link
                href="/search"
                className={`py-2 text-center text-lg ${
                  pathname.startsWith("/search")
                    ? "text-purple-200 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Buscar
              </Link>
              <Link
                href="/analysis"
                className={`py-2 text-center text-lg ${
                  pathname.startsWith("/analysis")
                    ? "text-purple-200 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Análise
              </Link>
              <div className="border-t border-purple-700 w-full my-2"></div>
              <span className="text-center">{user?.name}</span>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="bg-secondary hover:opacity-60 py-2 rounded-md text-lg transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`py-2 text-center text-lg ${
                  pathname === "/auth/login"
                    ? "text-purple-200 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/auth/register"
                className="bg-secondary hover:opacity-90 py-2 rounded-md text-lg transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
