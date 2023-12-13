import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 text-base-content rounded bg-neutral">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">Home</a>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Support</a>
      </nav>
      <aside>
        <p>
          &copy; 2023 Made with 💚 by{" "}
          <Link className="hover:underline" href="https://www.linkedin.com/in/pooriataghdiri/">
            Pooria Taghdiri
          </Link>
        </p>
      </aside>
    </footer>
  );
}
