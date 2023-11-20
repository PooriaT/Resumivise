// pages/support.tsx

function Support() {
  return (
    <div className="container mx-auto mt-8 flex-grow">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Support</h1>
        <p className="p-2">
          Welcome, and thank you for being a part of our community! Your support means the world to us.
        </p>
        <p className="p-2">
          If you're eager to contribute, head over to our application's <a href="https://github.com/PooriaT/Resumivise"> GitHub repository</a>. 
          Feel free to fork it, create new issues, or jump into existing ones. Your feedback and ideas are invaluable to us – every contribution, 
          big or small, makes a difference.
        </p>
        <p className="p-2">
          And if you're loving what we do and want to support us even more, consider buying me a book.
        </p>
        <button className="flex items-center justify-center">
          <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" 
            data-slug="pooria7" data-color="#40DCA5" data-emoji="📖"  data-font="Cookie" data-text="Buy me a book" data-outline-color="#000000" 
            data-font-color="#ffffff" data-coffee-color="#FFDD00" >
          </script>
        </button>
        <p className="p-2">
          Your support fuels our passion, and we truly appreciate it. Thanks for being a vital part of our journey.
        </p>
      </section>
    </div>
  );
}



export default Support;
