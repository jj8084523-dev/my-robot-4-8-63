
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
  className?: string;
}

const TeamMemberCard = ({ 
  name, 
  role, 
  bio,
  imageSrc,
  className 
}: TeamMemberCardProps) => {
  return (
    <div className={cn("card overflow-hidden group", className)}>
      <div className="relative overflow-hidden mb-4 h-64">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-myrobot-navy text-white text-5xl font-bold">
            {name.charAt(0)}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-myrobot-navy/80 to-transparent p-4 text-white">
          <h3 className="font-bold text-xl">{name}</h3>
          <p className="text-myrobot-orange">{role}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-myrobot-gray">{bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
