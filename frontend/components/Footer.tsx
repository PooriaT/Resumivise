import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-neutral text-base-content">
      <aside>
        <p>
          &copy; 2023. Made with 💚 by{" "}
          <Link href="https://www.linkedin.com/in/pooriataghdiri/">
            Pooria Taghdiri
          </Link>
          .
        </p>
      </aside>
    </footer>
  );
}
