const CallToAction = () => {
  return (
    <div id="cta" className="mt-10 my-10">
      <div className="max-w-5xl py-16 md:pl-20 md:w-full max-md:text-center mx-2 md:mx-auto flex flex-col md:flex-row items-center justify-between text-left bg-gradient-to-b from-[#15551d] to-[#00ff9d] rounded-2xl p-10 text-white">
        <div>
          <h1 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
            Build your resume in minutes
          </h1>
          <p className="bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg">
            Start your free trial now.
          </p>
        </div>
        <button className="px-12 py-3 text-slate-800 bg-white rounded-full text-sm mt-4">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
