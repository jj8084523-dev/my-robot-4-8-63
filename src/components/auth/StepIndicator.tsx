
import { useLanguage } from "@/contexts/LanguageContext";

const StepIndicator = ({ currentStep, totalSteps, labels }: { 
  currentStep: number; 
  totalSteps: number;
  labels?: string[];
}) => {
  const { language } = useLanguage();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center relative">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index < currentStep;
          const isCurrent = index === currentStep - 1;
          
          return (
            <div key={index} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive 
                    ? "bg-myrobot-orange text-white" 
                    : "bg-gray-200 text-gray-500"
                } ${
                  isCurrent 
                    ? "ring-4 ring-myrobot-orange/20" 
                    : ""
                }`}
              >
                {index + 1}
              </div>
              
              {labels && (
                <span className={`text-xs mt-2 text-center max-w-[80px] ${
                  isActive ? "text-myrobot-navy font-medium" : "text-gray-500"
                }`}>
                  {labels[index]}
                </span>
              )}
            </div>
          );
        })}
        
        {/* Connecting Lines */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0">
          <div 
            className="h-full bg-myrobot-orange transition-all" 
            style={{ 
              width: `${Math.max(0, (currentStep - 1) / (totalSteps - 1) * 100)}%`,
              transformOrigin: language === 'ar' ? 'right' : 'left' 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
