import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar bg-secondary">
      <div className="flex-1">
        <a className="btn btn-ghost hover:bg-transparent hover:scale-110 text-xl">Resumivise</a>
      </div>
      <div className="flex-none px-4">
        <ul className="flex gap-10 px-1">
        <li className=" rounded-xl hover:cursor-pointer hover:scale-110">
          <Link href="/">
            Home
          </Link>
        </li>
        <li className="rounded-xl hover:cursor-pointer hover:scale-110">
          <Link href="/about">
            About
          </Link>
        </li>
        <li className=" rounded-xl hover:cursor-pointer hover:scale-110">
          <Link href="/support">
            Support
          </Link>
        </li>
        </ul>
      </div>
    </nav>
  );
}
