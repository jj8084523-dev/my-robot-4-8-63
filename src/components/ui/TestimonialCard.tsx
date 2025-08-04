
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  imageSrc?: string;
  className?: string;
}

const TestimonialCard = ({ 
  content, 
  author, 
  role, 
  imageSrc,
  className 
}: TestimonialCardProps) => {
  return (
    <div className={cn("card bg-white", className)}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.25 21.75H9C8.175 21.75 7.5 21.075 7.5 20.25V15C7.5 14.175 8.175 13.5 9 13.5H12.75C13.575 13.5 14.25 12.825 14.25 12V9.75C14.25 8.925 13.575 8.25 12.75 8.25H9C6.525 8.25 4.5 10.275 4.5 12.75V20.25C4.5 22.725 6.525 24.75 9 24.75H14.25C15.075 24.75 15.75 24.075 15.75 23.25V22.5C15.75 22.05 15.45 21.75 15 21.75C14.55 21.75 14.25 21.75 14.25 21.75ZM27 8.25H21.75C20.925 8.25 20.25 8.925 20.25 9.75V10.5C20.25 10.95 20.55 11.25 21 11.25C21.45 11.25 21.75 11.25 21.75 11.25H27C27.825 11.25 28.5 11.925 28.5 12.75V15C28.5 15.825 27.825 16.5 27 16.5H23.25C22.425 16.5 21.75 17.175 21.75 18V23.25C21.75 24.075 22.425 24.75 23.25 24.75H27C29.475 24.75 31.5 22.725 31.5 20.25V12.75C31.5 10.275 29.475 8.25 27 8.25Z" fill="#FF8C42"/>
          </svg>
        </div>
        <p className="text-myrobot-gray flex-grow mb-4">{content}</p>
        <div className="flex items-center mt-2">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={author} 
              className="w-12 h-12 rounded-full object-cover mr-3" 
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-myrobot-navy text-white flex items-center justify-center font-bold mr-3">
              {author.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-bold text-myrobot-navy">{author}</h4>
            <p className="text-sm text-myrobot-gray">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
