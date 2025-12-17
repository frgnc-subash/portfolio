const App = () => {
  return (
    <div className="min-h-screen  text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl font-bold mb-4">
          Under Construction
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Hi Visitor! I'm currently building something specific here.
        </p>
      </div>
      <p className="text-amber-600 mb-3.5">You can find me here!</p>
      <div className="flex items-center space-x-4 text-gray-500 font-medium">
        <a
          href="https://github.com/frgnc-subash"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-300"
        >
          Github
        </a>
        <span>|</span>
        <a
          href="https://instagram.com/frgnc.subash"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition-colors duration-300"
        >
          Instagram
        </a>
        <span>|</span>
        <a
          href="https://discord.https://discord.gg/Xjwm9mVvQW"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition-colors duration-300"
        >
          Discord
        </a>
      </div>
    </div>
  );
};

export default App;
