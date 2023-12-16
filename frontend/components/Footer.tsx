import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 text-base-content rounded bg-neutral">
      <nav className="grid grid-flow-col gap-4">
        <a className="hover:cursor-pointer hover:scale-110">Home</a>
        <a className="hover:cursor-pointer hover:scale-110">About</a>
        <a className="hover:cursor-pointer hover:scale-110">Support</a>
      </nav>
      <aside>
        <p>
          &copy; 2023 Made with 💙 by{" "}
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
