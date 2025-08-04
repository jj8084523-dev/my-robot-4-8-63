
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getChildren, type Child } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StepIndicator from "@/components/auth/StepIndicator";
import { CheckCircle, CreditCard, ChevronLeft, PlusCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CourseRegistrationFlowProps {
  course: {
    id: number;
    title: string;
    price: number;
  };
  onBack: () => void;
}

const CourseRegistrationFlow = ({ course, onBack }: CourseRegistrationFlowProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [existingChildren, setExistingChildren] = useState<Child[]>([]);

  useEffect(() => {
    // Load children from localStorage
    const savedChildren = getChildren();
    setExistingChildren(savedChildren);
  }, []);
  
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childSelection: "existing", // "existing" or "new"
    selectedChildId: "",
    childName: "",
    childAge: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    // Very simple validation
    if (step === 1) {
      if (!formData.parentName || !formData.email || !formData.phone) {
        toast.error(language === "en" ? "Please fill all required fields" : "الرجاء ملء جميع الحقول المطلوبة");
        return;
      }
    } else if (step === 2) {
      if (formData.childSelection === "existing") {
        if (!formData.selectedChildId) {
          toast.error(language === "en" ? "Please select a child" : "الرجاء اختيار طفل");
          return;
        }
      } else {
        if (!formData.childName || !formData.childAge) {
          toast.error(language === "en" ? "Please fill all required fields" : "الرجاء ملء جميع الحقول المطلوبة");
          return;
        }
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit the form (simulate payment processing)
      toast.success(
        language === "en"
          ? "Payment successful! You are now enrolled in the course."
          : "تمت عملية الدفع بنجاح! أنت الآن مسجل في الدورة."
      );
      
      // Redirect to a success page or close the dialog
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const stepLabels = language === "en"
    ? ["Parent Information", "Child Selection", "Payment"]
    : ["معلومات الوالدين", "اختيار الطفل", "الدفع"];

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="absolute left-4 top-4"
          >
            <ChevronLeft />
          </Button>
          <DialogTitle className="text-2xl text-myrobot-navy pt-4">
            {language === "en" ? "Register for Course" : "التسجيل في الدورة"}
          </DialogTitle>
          <DialogDescription>
            {course.title} - ${course.price}
          </DialogDescription>
        </DialogHeader>

        <StepIndicator currentStep={step} totalSteps={3} labels={stepLabels} />

        {/* Step 1: Parent Information */}
        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="parentName">
                {language === "en" ? "Parent Full Name" : "اسم الوالد الكامل"} *
              </Label>
              <Input
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"} *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === "en" ? "Phone Number" : "رقم الهاتف"} *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {/* Step 2: Child Selection */}
        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <Label>
                {language === "en" ? "Child Selection" : "اختيار الطفل"}
              </Label>
              <RadioGroup
                value={formData.childSelection}
                onValueChange={(value) => handleSelectChange("childSelection", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing">
                    {language === "en" ? "Select from my children" : "اختر من أطفالي"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">
                    {language === "en" ? "Add a new child" : "إضافة طفل جديد"}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.childSelection === "existing" && (
              <div className="space-y-2">
                <Label htmlFor="selectedChild">
                  {language === "en" ? "Select Child" : "اختر الطفل"} *
                </Label>
                <Select 
                  value={formData.selectedChildId}
                  onValueChange={(value) => handleSelectChange("selectedChildId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "en" ? "Choose a child" : "اختر طفل"} />
                  </SelectTrigger>
                  <SelectContent>
                    {existingChildren.map((child) => (
                      <SelectItem key={child.id} value={child.id.toString()}>
                        {child.name} ({child.age} {language === "en" ? "years" : "سنوات"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.childSelection === "new" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="childName">
                    {language === "en" ? "Child Name" : "اسم الطفل"} *
                  </Label>
                  <Input
                    id="childName"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childAge">
                    {language === "en" ? "Child Age" : "عمر الطفل"} *
                  </Label>
                  <Select 
                    value={formData.childAge}
                    onValueChange={(value) => handleSelectChange("childAge", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={language === "en" ? "Select age" : "اختر العمر"} />
                    </SelectTrigger>
                    <SelectContent>
                      {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age} {language === "en" ? "years" : "سنوات"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h3 className="font-medium text-myrobot-navy">
                {language === "en" ? "Order Summary" : "ملخص الطلب"}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <span>{course.title}</span>
                <span>${course.price}</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between items-center font-bold">
                <span>{language === "en" ? "Total" : "المجموع"}</span>
                <span>${course.price}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">
                {language === "en" ? "Payment Method" : "طريقة الدفع"}
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleSelectChange("paymentMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">
                    {language === "en" ? "Credit Card" : "بطاقة ائتمان"}
                  </SelectItem>
                  <SelectItem value="debit-card">
                    {language === "en" ? "Debit Card" : "بطاقة خصم"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">
                {language === "en" ? "Card Number" : "رقم البطاقة"}
              </Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">
                  {language === "en" ? "Name on Card" : "الاسم على البطاقة"}
                </Label>
                <Input
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">
                    {language === "en" ? "Expiry Date" : "تاريخ الانتهاء"}
                  </Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">{language === "en" ? "CVV" : "رمز التحقق"}</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              {language === "en" ? "Back" : "رجوع"}
            </Button>
          ) : (
            <Button variant="outline" onClick={onBack}>
              {language === "en" ? "Cancel" : "إلغاء"}
            </Button>
          )}
          <Button onClick={handleNextStep} className="btn-primary">
            {step === 3 ? (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                {language === "en" ? "Pay Now" : "ادفع الآن"}
              </>
            ) : (
              language === "en" ? "Continue" : "متابعة"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseRegistrationFlow;
