// components/Navbar.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white justify-center items-center">
        <li>
          <Link className="px-2 text-lg" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="px-2 text-lg" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="px-2 text-lg" href="/support">
            Support
          </Link>
        </li>
      </ul>
    </nav>
  );
}


