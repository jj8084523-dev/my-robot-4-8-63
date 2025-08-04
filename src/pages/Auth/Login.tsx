
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["parent", "student", "coordinator", "admin"]),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { login } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "parent",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Call the login function from AuthContext
      await login(values.email, values.password, values.role);
      
      toast.success(language === 'en' 
        ? `Logged in successfully as ${values.role}!`
        : `تم تسجيل الدخول بنجاح كـ ${values.role}!`
      );
      
      // Navigate to the appropriate dashboard based on role
      if (values.role === "admin") {
        navigate("/admin/dashboard");
      } else if (values.role === "coordinator") {
        navigate("/coordinator/dashboard");
      } else if (values.role === "parent") {
        navigate("/parent/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      toast.error(language === 'en' 
        ? "Login failed. Please try again."
        : "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى."
      );
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <SectionHeading 
          title={language === 'en' ? "Welcome back!" : "مرحبًا بعودتك!"} 
          subtitle={language === 'en' 
            ? "Sign in to your account to access your dashboard" 
            : "سجل دخولك إلى حسابك للوصول إلى لوحة التحكم الخاصة بك"
          } 
          centered
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {language === 'en' ? "Login" : "تسجيل الدخول"}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'en' 
                ? "Enter your credentials to access your account" 
                : "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? "Email" : "البريد الإلكتروني"}</FormLabel>
                      <FormControl>
                        <Input placeholder={language === 'en' ? "your.email@example.com" : "بريدك@مثال.كوم"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? "Password" : "كلمة المرور"}</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? "I am a" : "أنا"}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'en' ? "Select your role" : "حدد دورك"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="parent">{language === 'en' ? "Parent" : "ولي أمر"}</SelectItem>
                          <SelectItem value="student">{language === 'en' ? "Student" : "طالب"}</SelectItem>
                          <SelectItem value="coordinator">{language === 'en' ? "Coordinator" : "منسق"}</SelectItem>
                          <SelectItem value="admin">{language === 'en' ? "Admin" : "مسؤول"}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <Link to="/auth/forgot-password" className="text-sm text-myrobot-orange hover:underline">
                    {language === 'en' ? "Forgot password?" : "نسيت كلمة المرور؟"}
                  </Link>
                </div>

                <Button type="submit" className="btn-primary w-full">
                  {language === 'en' ? "Login" : "تسجيل الدخول"}
                </Button>

                {/* Social Login Buttons */}
                <div className="space-y-3">
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
                      onClick={() => {
                        toast.success("Google login successful!");
                        navigate("/parent/dashboard");
                      }}
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
                      onClick={() => {
                        toast.success("Apple login successful!");
                        navigate("/parent/dashboard");
                      }}
                      className="w-full"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.605-2.068 4.777-1.172 1.172-2.914 1.898-4.768 2.07-.557.05-1.026.048-1.406.03V9.59h2.422c.477 0 .917-.19 1.233-.506.316-.316.506-.756.506-1.233s-.19-.917-.506-1.233c-.316-.316-.756-.506-1.233-.506H9.326c-.618 0-1.216.13-1.74.364-.72.321-1.366.86-1.806 1.553C5.537 8.44 5.326 8.99 5.326 9.59v4.82c0 .6.211 1.15.454 1.56.44.693 1.086 1.232 1.806 1.553.524.234 1.122.364 1.74.364h2.422c.477 0 .917-.19 1.233-.506.316-.316.506-.756.506-1.233s-.19-.917-.506-1.233c-.316-.316-.756-.506-1.233-.506H9.326v-1.458c.38.018.849.02 1.406-.03 1.854-.172 3.596-.898 4.768-2.07s1.899-2.919 2.068-4.777z"/>
                      </svg>
                      Apple
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-center text-sm">
              {language === 'en' ? "Don't have an account yet? " : "ليس لديك حساب بعد؟ "}
              <Link to="/auth/register" className="text-myrobot-orange hover:underline font-medium">
                {language === 'en' ? "Register now" : "سجل الآن"}
              </Link>
            </div>
            <div className="text-center">
              <img 
                src="/placeholder.svg"
                alt={language === 'en' ? "Robot illustration" : "رسم توضيحي للروبوت"} 
                className="h-24 mx-auto opacity-50"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
