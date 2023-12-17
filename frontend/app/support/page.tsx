import Image from "next/image";
import Link from "next/link";

function Support() {
  const pooria = {
    email: "pooria@duck.com",
    linkedin: "https://www.linkedin.com/in/pooriataghdiri/",
    github: "https://github.com/PooriaT",
    buyMeACoffee: "https://www.buymeacoffee.com/pooria7",
  };

  const alja = {
    email: "alja.cekada@gmail.com",
    linkedin: "https://www.linkedin.com/in/alja-cekada/",
    github: "https://github.com/alchuu00",
  };
  return (
    <div className="container mx-auto flex-grow bg-secondary px-28">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Support</h1>
        <p className="p-2">
          Welcome, and thank you for being a part of our community! Your support
          means the world to us.
        </p>
        <p className="p-2">
          If you are eager to contribute, visit our application&apos;s{" "}
          <a
            href="https://github.com/PooriaT/Resumivise"
            className="text-neutral hover:text-primary">
            {" "}
            GitHub repository
          </a>
          . Fork it, create new issues, or jump into existing ones. Your
          feedback and ideas are invaluable to us – every contribution, big or
          small, makes a difference.
        </p>
        <p className="p-2">
          Your support fuels our passion, and we appreciate it. Thanks for being
          a vital part of our journey.
        </p>
        <p className="p-2">
          And if you want to support us even more, consider buying Pooria a book
          or a coffee!
        </p>
        <h2 className="text-3xl font-bold my-6 text-center">Contact Us</h2>
        <div className="flex justify-center gap-6 mb-8">
          <div className="card w-96 bg-gray-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Pooria Taghdiri</h2>
              <a href={pooria.email}>Email: {pooria.email}</a>
              <a href={pooria.linkedin} target="_blank">
                LinkedIn: pooriataghdiri
              </a>
              <a href={pooria.github} target="_blank">
                GitHub: PooriaT
              </a>
              <Link href="https://www.buymeacoffee.com/pooria7" target="_blank">
                <Image
                  className="py-4 w-52"
                  src="/buyMeACoffeeBtn.png"
                  alt="Buy Me A Coffee"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
          </div>
          <div className="card w-96 bg-gray-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Alja Cekada</h2>
              <a href={alja.email}>Email: {alja.email}</a>
              <a href={alja.linkedin} target="_blank">
                LinkedIn: aljacekada
              </a>
              <a href={alja.github} target="_blank">
                GitHub: Alchuu00
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Support;
