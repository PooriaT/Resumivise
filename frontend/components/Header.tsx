// components/Navbar.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white justify-center">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
        <li>
          <Link href="/support">
            Support
          </Link>
        </li>
      </ul>
    </nav>
  );
}


