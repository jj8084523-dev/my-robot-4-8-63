
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AccessGate from "@/components/ui/AccessGate";
import { Link } from "react-router-dom";
import CourseDetailsDialog from "@/components/programs/CourseDetailsDialog";

interface ProgramCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  ageGroup: string;
  className?: string;
  course?: {
    id: number;
    title: string;
    description: string;
    ageGroup: string;
    levels: string[];
    details: string[];
    price: number;
    duration: string;
    schedule: string;
    prerequisites?: string;
  };
}

const ProgramCard = ({ 
  title, 
  description, 
  icon, 
  ageGroup,
  className,
  course
}: ProgramCardProps) => {
  return (
    <div className={cn("program-card group", className)}>
      <div className="flex items-start">
        <div className="bg-myrobot-orange/10 p-4 rounded-xl text-myrobot-orange mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-xl text-myrobot-navy">{title}</h3>
            <span className="bg-myrobot-navy/10 text-myrobot-navy text-xs font-medium px-3 py-1 rounded-full">
              Ages {ageGroup}
            </span>
          </div>
          <AccessGate 
            requiredLevel={4}
            fallback={
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-myrobot-gray mb-2">Register as a parent to view full course details and pricing</p>
                <Link to="/auth/register">
                  <Button size="sm" className="btn-primary">Register Account</Button>
                </Link>
              </div>
            }
          >
            {course ? (
              <CourseDetailsDialog course={course} />
            ) : (
              <Button className="btn-outline group-hover:bg-myrobot-orange/10">Learn More</Button>
            )}
          </AccessGate>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
