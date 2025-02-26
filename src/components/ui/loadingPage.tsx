const LoadingPage = () => {
  const radius = 46;
  const circleArray = new Array(17).fill(1);
  const totalCircles = circleArray.length;
  const delay = 60;

  return (
    <div className="grid place-content-center h-screen w-full sticky top-0">
      <div className="relative w-[87px] h-[87px]">
        {circleArray.map((_, index) => {
          const angle = (index / totalCircles) * 360;
          const positionX = radius * Math.cos((angle * Math.PI) / 180);
          const positionY = radius * Math.sin((angle * Math.PI) / 180);
          const style = {
            top: `calc(50% - ${positionY}px)`,
            left: `calc(50% + ${positionX}px)`,
            animationDelay: `${index * delay}ms`,
          };
          return (
            <div
              key={index}
              className={`opacity-0 absolute  w-3 h-3 rounded-full bg-gray-500 animate-loader `}
              style={style}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingPage;
