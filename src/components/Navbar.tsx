"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">BERSERI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
              Beranda
            </Link>
            <Link href="/screening" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
              Screening Center
            </Link>
            <Link href="/patient" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
              Patient Track
            </Link>
            <Link href="/educare" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
              EduCare 2045
            </Link>
            <Link
              href="/detect"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-all shadow-lg shadow-pink-200"
            >
              Deteksi Sekarang
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-pink-50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

          {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-pink-500 px-3 py-2 rounded-lg hover:bg-pink-50" onClick={() => setMobileOpen(false)}>
                Beranda
              </Link>
              <Link href="/screening" className="text-sm font-medium text-gray-600 hover:text-pink-500 px-3 py-2 rounded-lg hover:bg-pink-50" onClick={() => setMobileOpen(false)}>
                Screening Center
              </Link>
              <Link href="/patient" className="text-sm font-medium text-gray-600 hover:text-pink-500 px-3 py-2 rounded-lg hover:bg-pink-50" onClick={() => setMobileOpen(false)}>
                Patient Track
              </Link>
              <Link href="/educare" className="text-sm font-medium text-gray-600 hover:text-pink-500 px-3 py-2 rounded-lg hover:bg-pink-50" onClick={() => setMobileOpen(false)}>
                EduCare 2045
              </Link>
              <Link
                href="/detect"
                className="px-5 py-2 rounded-full text-sm font-semibold text-white gradient-bg text-center"
                onClick={() => setMobileOpen(false)}
              >
                Deteksi Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
