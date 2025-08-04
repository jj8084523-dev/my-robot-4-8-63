
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import CourseRegistrationFlow from "./CourseRegistrationFlow";

interface CourseDetailsDialogProps {
  course: {
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

const CourseDetailsDialog = ({ course }: CourseDetailsDialogProps) => {
  const { language } = useLanguage();
  const [showRegistration, setShowRegistration] = useState(false);

  if (showRegistration) {
    return <CourseRegistrationFlow course={course} onBack={() => setShowRegistration(false)} />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-outline group-hover:bg-myrobot-orange/10">
          {language === "en" ? "Learn More" : "معرفة المزيد"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-myrobot-navy">{course.title}</DialogTitle>
          <DialogDescription className="text-myrobot-gray">
            {language === "en" ? "For ages" : "للأعمار"} {course.ageGroup}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h4 className="font-medium text-myrobot-navy">
                {language === "en" ? "Course Price" : "سعر الدورة"}
              </h4>
              <p className="text-2xl font-bold text-myrobot-orange">${course.price}</p>
            </div>
            <div>
              <h4 className="font-medium text-myrobot-navy">
                {language === "en" ? "Duration" : "المدة"}
              </h4>
              <p className="text-lg">{course.duration}</p>
            </div>
            <div>
              <h4 className="font-medium text-myrobot-navy">
                {language === "en" ? "Schedule" : "الجدول"}
              </h4>
              <p className="text-lg">{course.schedule}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg text-myrobot-navy">
              {language === "en" ? "Course Description" : "وصف الدورة"}
            </h4>
            <p className="my-2">{course.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg text-myrobot-navy">
              {language === "en" ? "What You'll Learn" : "ماذا ستتعلم"}
            </h4>
            <ul className="my-2 space-y-2">
              {course.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <Star className="text-myrobot-orange mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {course.prerequisites && (
            <div>
              <h4 className="font-medium text-lg text-myrobot-navy">
                {language === "en" ? "Prerequisites" : "المتطلبات المسبقة"}
              </h4>
              <p className="my-2">{course.prerequisites}</p>
            </div>
          )}
          
          <div className="pt-4 flex justify-end">
            <Button className="btn-primary" onClick={() => setShowRegistration(true)}>
              {language === "en" ? "Register Now" : "سجل الآن"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailsDialog;
