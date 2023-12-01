// pages/support.tsx
import Script from "next/script";
import Image from 'next/image';
import Link from 'next/link';

function Support() {
  return (
    <div className="container mx-auto mt-8 flex-grow">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Support</h1>
        <p className="p-2">
          Welcome, and thank you for being a part of our community! Your support means the world to us.
        </p>
        <p className="p-2">
          If you&apos;re eager to contribute, head over to our application&apos;s <a href="https://github.com/PooriaT/Resumivise"> GitHub repository</a>. 
          Feel free to fork it, create new issues, or jump into existing ones. Your feedback and ideas are invaluable to us – every contribution, 
          big or small, makes a difference.
        </p>
        <p className="p-2">
          Your support fuels our passion, and we truly appreciate it. Thanks for being a vital part of our journey.
        </p>
        <p className="p-2">
          And if you&apos;re loving what we do and want to support us even more, consider buying me a book or a coffee! &nbsp;&nbsp;
          <Link href="https://www.buymeacoffee.com/pooria7" target="_blank">
            <Image 
              className="py-4"
              src="/green-button.png" 
              alt="Buy Me A Coffee"
              width={217}
              height={60}
            />
          </Link>
        </p>
      </section>
    </div>
  );
}



export default Support;
