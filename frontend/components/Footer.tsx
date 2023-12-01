// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      <p>&copy; 2023. Made with 💚 by <Link href="https://www.linkedin.com/in/pooriataghdiri/">Pooria Taghdiri</Link>.</p>
    </footer>
  );
}

