
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addNotification } from "@/lib/localStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";

// Import custom components
import StepIndicator from "@/components/auth/StepIndicator";
import { registerFormSchema, RegisterFormValues } from "@/components/auth/RegisterSchema";
import ParentInformationStep from "@/components/auth/ParentInformationStep";
import StudentInformationStep from "@/components/auth/StudentInformationStep";
import ConfirmationStep from "@/components/auth/ConfirmationStep";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const stepLabels = language === 'en' 
    ? ["Parent Information", "Student Information", "Confirm Registration"]
    : ["معلومات ولي الأمر", "معلومات الطالب", "تأكيد التسجيل"];

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      parentFullName: "",
      parentEmail: "",
      parentPhone: "",
      studentName: "",
      studentAge: "",
      interestArea: "robotics",
      courseLevel: "beginner",
      password: "",
      termsAccepted: false as unknown as true,
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    console.log("Registration values:", values);
    
    // Add notification for admin
    addNotification(`New user registration: ${values.parentFullName} (${values.parentEmail})`, 'register');
    
    toast.success(language === 'en' ? "Registration successful!" : "تم التسجيل بنجاح!");
    navigate("/auth/registration-success");
  };

  const nextStep = () => {
    if (step === 1) {
      const parentFields = ["parentFullName", "parentEmail", "parentPhone"];
      const isValid = parentFields.every((field) => {
        const result = form.trigger(field as any);
        return result;
      });

      if (isValid) {
        setStep(step + 1);
      }
    } else if (step === 2) {
      const studentFields = ["studentName", "studentAge", "interestArea", "courseLevel"];
      const isValid = studentFields.every((field) => {
        const result = form.trigger(field as any);
        return result;
      });

      if (isValid) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <SectionHeading
          title={language === 'en' ? "Register for My Robot" : "التسجيل في روبوتي"}
          subtitle={language === 'en' ? "Create an account to enroll your child in our courses" : "أنشئ حسابًا لتسجيل طفلك في دوراتنا"}
          centered
        />

        <Card>
          <CardHeader>
            <StepIndicator currentStep={step} totalSteps={totalSteps} labels={stepLabels} />
            <CardTitle className="text-center text-2xl font-bold">
              {language === 'en' ? stepLabels[step - 1] : stepLabels[step - 1]}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Parent Information */}
                {step === 1 && (
                  <ParentInformationStep control={form.control} />
                )}

                {/* Step 2: Student Information */}
                {step === 2 && (
                  <StudentInformationStep control={form.control} />
                )}

                {/* Step 3: Confirmation and Terms */}
                {step === 3 && (
                  <ConfirmationStep control={form.control} watch={form.watch} />
                )}

                {/* Social Login Buttons */}
                {step === 1 && (
                  <div className="space-y-3 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="w-full"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="w-full"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.605-2.068 4.777-1.172 1.172-2.914 1.898-4.768 2.07-.557.05-1.026.048-1.406.03V9.59h2.422c.477 0 .917-.19 1.233-.506.316-.316.506-.756.506-1.233s-.19-.917-.506-1.233c-.316-.316-.756-.506-1.233-.506H9.326c-.618 0-1.216.13-1.74.364-.72.321-1.366.86-1.806 1.553C5.537 8.44 5.326 8.99 5.326 9.59v4.82c0 .6.211 1.15.454 1.56.44.693 1.086 1.232 1.806 1.553.524.234 1.122.364 1.74.364h2.422c.477 0 .917-.19 1.233-.506.316-.316.506-.756.506-1.233s-.19-.917-.506-1.233c-.316-.316-.756-.506-1.233-.506H9.326v-1.458c.38.018.849.02 1.406-.03 1.854-.172 3.596-.898 4.768-2.07s1.899-2.919 2.068-4.777z"/>
                        </svg>
                        Apple
                      </Button>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="px-8"
                    >
                      {language === 'en' ? "Back" : "رجوع"}
                    </Button>
                  )}

                  {step < totalSteps ? (
                    <Button
                      type="button"
                      className="btn-primary ml-auto"
                      onClick={nextStep}
                    >
                      {language === 'en' ? "Continue" : "متابعة"}
                    </Button>
                  ) : (
                    <Button type="submit" className="btn-primary ml-auto">
                      {language === 'en' ? "Complete Registration" : "إكمال التسجيل"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex-col space-y-4">
            <div className="text-center text-sm">
              {language === 'en' ? "Already have an account? " : "هل لديك حساب بالفعل؟ "}
              <Link to="/auth/login" className="text-myrobot-orange hover:underline font-medium">
                {language === 'en' ? "Sign in" : "تسجيل الدخول"}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
