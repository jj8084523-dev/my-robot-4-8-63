
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false, 
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-12", 
      centered && "text-center",
      className
    )}>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="text-lg text-myrobot-gray mt-3 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
