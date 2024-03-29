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
    <div className="flex-grow bg-secondary lg:px-28 md:px-16 px-6 w-screen">
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
          And if you want to support us even more, consider buying us a book
          or a coffee!
          <Link href="https://www.buymeacoffee.com/pooria7" target="_blank">
          <Image
            className="py-4 lg:w-52"
            src="/buyMeACoffeeBtn.png"
            alt="Buy Me A Coffee"
            width={150}
            height={150}
          />
        </Link>
        </p>
        <h2 className="text-3xl font-bold my-6 text-center">Our Team</h2>
        <div className="flex md:flex-row flex-col justify-center gap-6 mb-8">
          {/* card 1 */}
          <div className="card md:w-1/3 bg-gray-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <img
                  src="/linkedin_profile/pooria_profile.jpg"
                  alt="Pooria Taghdiri"
                  className="inline-block mr-2 h-20 w-20 rounded-full object-cover"
                />
                Pooria Taghdiri
              </h2>
              <div className="card-actions justify-center" >
                <a href={`mailto:${pooria.email}`} target="_blank">
                  <img src="/icons/email.svg" alt="Email Icon" className="inline-block mr-2 h-10 w-10" />
                </a>
                <a href={pooria.linkedin} target="_blank">
                  <img src="/icons/linkedin.svg" alt="LinkedIn Icon" className="inline-block mr-2 h-10 w-10" /> 
                </a>
                <a href={pooria.github} target="_blank">
                  <img src="/icons/github.svg" alt="GitHub Icon" className="inline-block mr-2 h-10 w-10" />
                </a>
              </div>
            </div>
          </div>
          {/* card 2 */}
          <div className="card md:w-1/3 bg-gray-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <img
                  src="/linkedin_profile/alja_profile.jpg"
                  alt="Alja Cekada"
                  className="inline-block mr-2 h-20 w-20 rounded-full object-cover"
                />
                Alja Cekada
              </h2>
              <div className="card-actions justify-center" >
                <a href={`mailto:${alja.email}`} target="_blank">
                  <img src="/icons/email.svg" alt="Email Icon" className="inline-block mr-2 h-10 w-10" />
                </a>
                <a href={alja.linkedin} target="_blank">
                  <img src="/icons/linkedin.svg" alt="LinkedIn Icon" className="inline-block mr-2 h-10 w-10" /> 
                </a>
                <a href={alja.github} target="_blank">
                  <img src="/icons/github.svg" alt="GitHub Icon" className="inline-block mr-2 h-10 w-10" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Support;
