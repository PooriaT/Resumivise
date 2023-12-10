import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Resumivise</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
      </div>
    </nav>
  );
}
