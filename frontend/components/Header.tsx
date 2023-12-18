"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex lg:flex-row flex-col justify-between items-center bg-secondary px-6 py-4">
      <div className="flex justify-between items-center w-full">
        <a href="/" className="btn btn-ghost hover:bg-transparent hover:scale-110 text-xl">
          Resumivise
        </a>
        <div
          className="flex-none px-4 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}>
          {/* Toggle isOpen state */}
          <FaBars size={24} />
        </div>
      </div>

      {/* hamburger menu */}
      {isOpen && (
        <div className="flex flex-col justify-start items-center top-0 right-0 bg-white rounded shadow-lg w-screen h-screen">
          <ul className="p-4 w-full flex flex-col justify-start items-center">
            <li className="my-2 py-3 w-full text-center rounded-2xl shadow-sm">
              <Link href="/" onClick={() => setIsOpen(!isOpen)}>
                Home
              </Link>
            </li>
            <li className="my-2 py-3 w-full text-center rounded-2xl shadow-sm">
              <Link href="/about" onClick={() => setIsOpen(!isOpen)}>
                About
              </Link>
            </li>
            <li className="my-2 py-3 w-full text-center rounded-2xl shadow-sm">
              <Link href="/support" onClick={() => setIsOpen(!isOpen)}>
                Support
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="hidden lg:flex px-4">
        {/* Hide on small screens */}
        <ul className="flex gap-10 px-1">
          <li className="rounded-xl hover:cursor-pointer hover:scale-110">
            <Link href="/">Home</Link>
          </li>
          <li className="rounded-xl hover:cursor-pointer hover:scale-110">
            <Link href="/about">About</Link>
          </li>
          <li className="rounded-xl hover:cursor-pointer hover:scale-110">
            <Link href="/support">Support</Link>
          </li>
        </ul>
      </div>
      
    </nav>
  );
}
