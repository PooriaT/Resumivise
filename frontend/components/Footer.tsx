import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 text-base-content rounded bg-neutral">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/" className="hover:cursor-pointer hover:scale-110">
          Home
        </Link>
        <Link href="/about" className="hover:cursor-pointer hover:scale-110">
          About
        </Link>
        <Link href="/support" className="hover:cursor-pointer hover:scale-110">
          Support
        </Link>
      </nav>
      <aside>
        <p>
          &copy; 2024 Made with 💙 by{" "}
          <Link className="hover:underline" target="_blank" href="https://www.linkedin.com/in/pooriataghdiri/">
            Pooria
          </Link>
          {" "}&{" "}
          <Link className="hover:underline" target="_blank" href="https://www.linkedin.com/in/alja-cekada/">
            Alja
          </Link>
        </p>
      </aside>
    </footer>
  );
}
