import Typography from "../ui/typography";

const DashboardCards = () => {
  const cards = [
    {
      icon: "👔",
      title: "الموظفين",
      bgColor: "bg-teal-100",
      textColor: "text-teal-600",
      count:'23'
    },
    {
      icon: "📄",
      title: "الامتحانات",
      bgColor: "bg-pink-100",
      textColor: "text-blue-600",
      count:'12'
    },

    {
      icon: "🧍",
      title: "الطلاب",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      count:'147'
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4 pt-0">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-4 pt-2 min-h-[160px] flex gap-2 items-center"
        >
          <div className={`${card.bgColor} p-3 rounded-full`}>
            <span className={`text-2xl ${card.textColor}`}>{card.icon}</span>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold text-gray-800">{card.title}</h4>
            <Typography variant="subtitle1" size="medium" className=" text-gray-400">{card.count}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
