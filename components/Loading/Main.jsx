const MainLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" w-11 flex justify-between items-center">
        <div className="w-3 h-3 bg-green-300 rounded-full animate-jump"></div>
        <div className="w-3 h-3 bg-yellow-300  rounded-full animate-jump animation-delay-200"></div>
        <div className="w-3 h-3 bg-red-300  rounded-full animate-jump animation-delay-400"></div>
      </div>
    </div>
  );
};

export default MainLoading;
