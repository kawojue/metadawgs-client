import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AvatarGroup = () => {
  const gradients = [
    "bg-gradient-to-r from-purple-500 to-blue-500",
    "bg-gradient-to-r from-teal-400 to-blue-500",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-pink-500 to-purple-500",
    "bg-black",
  ];

  return (
    <div className="flex -space-x-2">
      {gradients.map((gradient, index) => (
        <Avatar
          key={index}
          className="border-2 border-black w-7.5 h-7.5 min-w-7.5 min-h-7.5"
        >
          <AvatarFallback className={`${gradient} text-transparent`}>
            {index === 4 && (
              <div className="flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
            )}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default AvatarGroup;
