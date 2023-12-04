// pages/about.tsx

function About() {
  const email = "mailto:pooria@duck.com";
  const linkedin = "https://www.linkedin.com/in/pooriataghdiri/";
  const github = "https://github.com/PooriaT";
  return (
    <div className="container mx-auto mt-8 flex-grow">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">About</h1>
        <p className="p-2">
          Welcome to Resumivise 🏢 – your go-to platform for crafting a standout resume! 
          We understand the challenges of job hunting, and that is why we are here to lend a helping hand.
        </p>
        <p className="p-2">
          Ever wondered how well your resume aligns with a job description? Our unique feature does just that! 
          We compare your resume to the job requirements, giving you a percentage match. But we do not stop there – 
          we guide you on enhancing your strengths and addressing any flaws in your resume. Think of us as your personal resume consultant!
        </p>
        <p className="p-2">
          Worried about privacy? We have got you covered. Your data is precious, and we treat it that way. No need to fret about your information 
          lingering in the cloud. Your uploaded resume is promptly removed after processing. Plus, you have control – the JSON data file, holding 
          extracted info from your resume, can be wiped manually at your request or automatically after a few hours.
        </p>
        <p className="p-2">
          Still have privacy concerns? Check out our app repository on <a href="https://github.com/PooriaT/Resumivise">GitHub</a> 
          for transparency and peace of mind. Your concerns matter to us!
        </p>
        <p className="p-2 font-medium text-red-500">
          Disclaimer: While Resumivise is here to assist, please note that we do not take responsibility for any issues that may arise in your resume 
          during the application process. It is crucial to review your resume thoroughly before hitting that apply button.
        </p>
        <p className="p-2">
          Ready to take the next step in your career? It is time to apply with confidence, thanks to Resumivise!
        </p>
      </section>
      <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
          <div>
            <a href={email}>Email: pooria@duck.com</a>
          </div>
          <div>
            <a href={linkedin}>LinkedIn/pooriataghdiri</a>
          </div>
          <div>
          <a href={github}>GitHub/PooriaT</a>
          </div>
        </section>
    </div>
  );
}

export default About;
