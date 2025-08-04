
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, DollarSign, ArrowLeft } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

interface Event {
  id: string;
  title: string;
  titleAr: string;
  date: string;
  location: string;
  locationAr: string;
  time: string;
  capacity: number;
  description: string;
  descriptionAr: string;
  price: number;
  image: string;
  enrolled: number;
  fullDescription?: string;
  fullDescriptionAr?: string;
}

const upcomingEvents: Event[] = [
  {
    id: "event1",
    title: "Robotics Summer Camp",
    titleAr: "معسكر الروبوتات الصيفي",
    date: "2025-07-10",
    location: "Main Campus, Building A",
    locationAr: "الحرم الرئيسي، المبنى أ",
    time: "9:00 AM - 4:00 PM",
    capacity: 30,
    description: "A week-long immersive robotics experience where students will build and program their own robots, participate in exciting challenges, and showcase their creations.",
    descriptionAr: "تجربة الروبوتات الغامرة التي تستمر لمدة أسبوع حيث سيقوم الطلاب ببناء وبرمجة الروبوتات الخاصة بهم، والمشاركة في تحديات مثيرة، وعرض إبداعاتهم.",
    fullDescription: "Join us for an exhilarating week-long summer camp focused on robotics and programming! Students ages 10-16 will have the opportunity to design, build, and program their own robots using state-of-the-art technology. The camp includes daily hands-on workshops, team challenges, and culminates in an exciting robot showcase where participants will demonstrate their creations to family and friends. All equipment and materials are provided, and lunch is included daily. Our experienced instructors will guide students through the fundamentals of robotics engineering and programming, making this suitable for both beginners and those with some prior experience. Limited spots available, so register early!",
    fullDescriptionAr: "انضم إلينا في معسكر صيفي مثير لمدة أسبوع يركز على الروبوتات والبرمجة! سيحصل الطلاب الذين تتراوح أعمارهم بين 10 و 16 عامًا على فرصة لتصميم وبناء وبرمجة الروبوتات الخاصة بهم باستخدام التكنولوجيا المتطورة. يتضمن المعسكر ورش عمل عملية يومية، وتحديات جماعية، وينتهي بعرض روبوت مثير حيث سيقوم المشاركون بعرض إبداعاتهم للعائلة والأصدقاء. يتم توفير جميع المعدات والمواد، ويتم تضمين الغداء يوميًا. سيرشد مدرسونا ذوو الخبرة الطلاب من خلال أساسيات هندسة الروبوتات والبرمجة، مما يجعل هذا مناسبًا للمبتدئين وأولئك الذين لديهم بعض الخبرة السابقة. المقاعد محدودة، لذا سجل مبكرًا!",
    price: 299,
    image: "/placeholder.svg",
    enrolled: 18
  },
  {
    id: "event2",
    title: "Arduino Workshop",
    titleAr: "ورشة عمل أردوينو",
    date: "2025-08-15",
    location: "Tech Lab, Building B",
    locationAr: "مختبر التكنولوجيا، المبنى ب",
    time: "10:00 AM - 2:00 PM",
    capacity: 20,
    description: "Learn the fundamentals of Arduino programming and electronics. Perfect for beginners who want to start their journey into the world of physical computing.",
    descriptionAr: "تعلم أساسيات برمجة الأردوينو والإلكترونيات. مثالي للمبتدئين الذين يرغبون في بدء رحلتهم في عالم الحوسبة المادية.",
    fullDescription: "This intensive 4-hour workshop introduces participants to the exciting world of Arduino and physical computing. Designed for absolute beginners, you'll learn how to set up your Arduino board, write basic code, and create simple circuits. By the end of the session, you'll have built your own interactive LED project to take home! Our expert instructors will guide you through hands-on activities and provide valuable resources for continuing your learning journey after the workshop. This workshop is perfect for students (ages 12+), educators, hobbyists, or anyone curious about electronics and programming. All materials are provided, including an Arduino Uno board and component kit that you'll keep after the workshop.",
    fullDescriptionAr: "تقدم ورشة العمل المكثفة هذه التي تستمر لمدة 4 ساعات المشاركين إلى عالم الأردوينو والحوسبة المادية المثير. مصممة للمبتدئين المطلقين، ستتعلم كيفية إعداد لوحة الأردوينو الخاصة بك، وكتابة التعليمات البرمجية الأساسية، وإنشاء دوائر بسيطة. بحلول نهاية الجلسة، ستكون قد أنشأت مشروع LED تفاعلي خاص بك لأخذه إلى المنزل! سيرشدك مدرسونا الخبراء خلال الأنشطة العملية ويقدمون موارد قيمة لمواصلة رحلة التعلم الخاصة بك بعد ورشة العمل. ورشة العمل هذه مثالية للطلاب (12 عامًا وما فوق)، والمعلمين، وهواة، أو أي شخص فضولي حول الإلكترونيات والبرمجة. يتم توفير جميع المواد، بما في ذلك لوحة Arduino Uno ومجموعة المكونات التي ستحتفظ بها بعد ورشة العمل.",
    price: 149,
    image: "/placeholder.svg",
    enrolled: 12
  },
  {
    id: "event3",
    title: "Coding Competition",
    titleAr: "مسابقة البرمجة",
    date: "2025-09-20",
    location: "Innovation Center",
    locationAr: "مركز الابتكار",
    time: "1:00 PM - 6:00 PM",
    capacity: 50,
    description: "Test your programming skills in this fun and challenging competition. Prizes for top performers and certificates for all participants.",
    descriptionAr: "اختبر مهاراتك في البرمجة في هذه المسابقة الممتعة والصعبة. جوائز لأفضل المتسابقين وشهادات لجميع المشاركين.",
    fullDescription: "Calling all young coders! Join us for an exciting afternoon of programming challenges designed to test your problem-solving abilities and coding skills. This competition is open to students ages 12-16 with any level of programming experience. Participants will work individually or in pairs to solve a series of increasingly difficult coding puzzles using Scratch, Python, or JavaScript. Our panel of expert judges from local tech companies will evaluate solutions based on functionality, efficiency, creativity, and presentation. Fantastic prizes await the top performers, including robotics kits, programming courses, and tech gadgets! All participants will receive certificates and My Robot merchandise. Don't miss this opportunity to showcase your talents and connect with other young programmers in your community!",
    fullDescriptionAr: "نداء لجميع المبرمجين الشباب! انضم إلينا في ظهيرة مثيرة من تحديات البرمجة المصممة لاختبار قدراتك على حل المشكلات ومهارات البرمجة. هذه المسابقة مفتوحة للطلاب الذين تتراوح أعمارهم بين 12-16 عامًا مع أي مستوى من خبرة البرمجة. سيعمل المشاركون بشكل فردي أو في أزواج لحل سلسلة من ألغاز البرمجة المتزايدة الصعوبة باستخدام Scratch أو Python أو JavaScript. ستقوم لجنة الخبراء من شركات التكنولوجيا المحلية بتقييم الحلول بناءً على الوظائف والكفاءة والإبداع والعرض. تنتظر جوائز رائعة أفضل المؤدين، بما في ذلك مجموعات الروبوتات، ودورات البرمجة، والأجهزة التقنية! سيحصل جميع المشاركين على شهادات وبضائع My Robot. لا تفوت هذه الفرصة لعرض مواهبك والتواصل مع المبرمجين الشباب الآخرين في مجتمعك!",
    price: 49,
    image: "/placeholder.svg",
    enrolled: 32
  }
];

const formSchema = z.object({
  studentName: z.string().min(2, { message: "Student name is required" }),
  studentAge: z.string().refine(val => {
    const age = parseInt(val);
    return !isNaN(age) && age >= 7 && age <= 16;
  }, { message: "Age must be between 7 and 16" }),
  parentName: z.string().min(2, { message: "Parent name is required" }),
  parentEmail: z.string().email({ message: "Valid email is required" }),
  parentPhone: z.string().min(10, { message: "Valid phone number is required" }),
  paymentMethod: z.enum(["creditCard", "bankTransfer", "paypal"]),
});

type FormValues = z.infer<typeof formSchema>;

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { t, language, direction } = useLanguage();
  const [registrationStep, setRegistrationStep] = useState<'details' | 'register' | 'payment'>('details');
  
  const event = upcomingEvents.find(e => e.id === eventId);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      studentAge: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      paymentMethod: "creditCard",
    },
  });
  
  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <h2 className="text-2xl font-bold text-myrobot-navy">
            {language === 'en' ? 'Event not found' : 'الفعالية غير موجودة'}
          </h2>
          <Button 
            className="mt-6" 
            onClick={() => navigate('/events')}
          >
            {language === 'en' ? 'Back to Events' : 'العودة إلى الفعاليات'}
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleRegister = () => {
    setRegistrationStep('register');
  };
  
  const handleBackToDetails = () => {
    setRegistrationStep('details');
  };
  
  const handleContinueToPayment = () => {
    const result = form.trigger();
    if (result) {
      setRegistrationStep('payment');
    }
  };
  
  const onSubmit = (values: FormValues) => {
    console.log("Registration values:", values);
    toast.success(language === 'en' ? "Registration successful! Redirecting to payment..." : "تم التسجيل بنجاح! جاري التحويل إلى الدفع...");
    
    // In a real app, we would process payment and save registration
    // For demo, let's simulate a successful payment
    setTimeout(() => {
      toast.success(language === 'en' ? "Payment successful!" : "تم الدفع بنجاح!");
      navigate("/events");
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12">
        {registrationStep === 'details' && (
          <>
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/events')}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                {language === 'en' ? 'Back to Events' : 'العودة إلى الفعاليات'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="h-60 md:h-80 bg-gray-200 relative">
                    <img 
                      src={event.image} 
                      alt={language === 'en' ? event.title : event.titleAr} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-3xl font-bold text-myrobot-navy mb-4">
                      {language === 'en' ? event.title : event.titleAr}
                    </h1>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 text-myrobot-orange font-medium">
                          <Calendar size={20} />
                          <span>{language === 'en' ? 'Date' : 'التاريخ'}</span>
                        </div>
                        <span className="text-sm mt-1">
                          {new Date(event.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 text-myrobot-orange font-medium">
                          <Clock size={20} />
                          <span>{language === 'en' ? 'Time' : 'الوقت'}</span>
                        </div>
                        <span className="text-sm mt-1">{event.time}</span>
                      </div>
                      
                      <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 text-myrobot-orange font-medium">
                          <MapPin size={20} />
                          <span>{language === 'en' ? 'Location' : 'المكان'}</span>
                        </div>
                        <span className="text-sm mt-1">
                          {language === 'en' ? event.location : event.locationAr}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 text-myrobot-orange font-medium">
                          <DollarSign size={20} />
                          <span>{language === 'en' ? 'Price' : 'السعر'}</span>
                        </div>
                        <span className="text-sm mt-1">${event.price}</span>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-myrobot-navy mb-3">
                        {language === 'en' ? 'About This Event' : 'عن هذه الفعالية'}
                      </h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        {language === 'en' ? event.fullDescription : event.fullDescriptionAr}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Event Registration' : 'التسجيل في الفعالية'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? `${event.enrolled} out of ${event.capacity} spots filled` 
                        : `${event.enrolled} من أصل ${event.capacity} مقعد تم ملؤها`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-myrobot-orange" />
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-myrobot-orange h-2.5 rounded-full" 
                            style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{language === 'en' ? 'Price:' : 'السعر:'}</span>
                          <span className="text-lg font-bold">${event.price}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-medium">{language === 'en' ? 'Spots remaining:' : 'المقاعد المتبقية:'}</span>
                          <span className="font-bold text-myrobot-orange">
                            {event.capacity - event.enrolled}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full btn-primary" 
                      onClick={handleRegister}
                      disabled={event.enrolled >= event.capacity}
                    >
                      {language === 'en' ? 'Register Now' : 'سجل الآن'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        )}
        
        {registrationStep === 'register' && (
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={handleBackToDetails}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft size={16} />
              {language === 'en' ? 'Back to Event Details' : 'العودة إلى تفاصيل الفعالية'}
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' 
                    ? `Register for ${event.title}` 
                    : `التسجيل في ${event.titleAr}`}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Please fill in the registration details' 
                    : 'يرجى ملء تفاصيل التسجيل'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-myrobot-navy">
                        {language === 'en' ? 'Student Information' : 'معلومات الطالب'}
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="studentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'en' ? 'Student Name' : 'اسم الطالب'}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="studentAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'en' ? 'Student Age' : 'عمر الطالب'}
                            </FormLabel>
                            <FormControl>
                              <Input type="number" min="7" max="16" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-myrobot-navy">
                        {language === 'en' ? 'Parent Information' : 'معلومات ولي الأمر'}
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="parentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'en' ? 'Parent Name' : 'اسم ولي الأمر'}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="parentEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                            </FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="parentPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleBackToDetails}
                >
                  {language === 'en' ? 'Back' : 'رجوع'}
                </Button>
                <Button 
                  className="btn-primary" 
                  onClick={handleContinueToPayment}
                >
                  {language === 'en' ? 'Continue to Payment' : 'متابعة للدفع'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {registrationStep === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setRegistrationStep('register')}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft size={16} />
              {language === 'en' ? 'Back to Registration' : 'العودة إلى التسجيل'}
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Payment Information' : 'معلومات الدفع'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Please select your payment method' 
                    : 'يرجى اختيار طريقة الدفع'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-myrobot-white/50 p-4 rounded-md border border-gray-200 mb-6">
                        <h3 className="font-medium text-myrobot-navy mb-2">
                          {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                        </h3>
                        <div className="flex justify-between">
                          <span>
                            {language === 'en' ? event.title : event.titleAr}
                          </span>
                          <span>${event.price}</span>
                        </div>
                        <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                          <span>{language === 'en' ? 'Total' : 'المجموع'}</span>
                          <span>${event.price}</span>
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              {language === 'en' ? 'Payment Method' : 'طريقة الدفع'}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="creditCard" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {language === 'en' ? 'Credit Card' : 'بطاقة ائتمان'}
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="bankTransfer" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {language === 'en' ? 'Bank Transfer' : 'تحويل بنكي'}
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="paypal" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    PayPal
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {form.watch("paymentMethod") === "creditCard" && (
                        <div className="mt-4 space-y-4">
                          <FormItem>
                            <FormLabel>
                              {language === 'en' ? 'Card Number' : 'رقم البطاقة'}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" />
                            </FormControl>
                          </FormItem>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormItem>
                              <FormLabel>
                                {language === 'en' ? 'Expiry Date' : 'تاريخ الانتهاء'}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" />
                              </FormControl>
                            </FormItem>
                            
                            <FormItem>
                              <FormLabel>
                                {language === 'en' ? 'CVC' : 'رمز التحقق'}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="123" />
                              </FormControl>
                            </FormItem>
                          </div>
                        </div>
                      )}
                      
                      {form.watch("paymentMethod") === "bankTransfer" && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600">
                            {language === 'en' 
                              ? 'Please transfer the amount to the following account:' 
                              : 'يرجى تحويل المبلغ إلى الحساب التالي:'}
                          </p>
                          <div className="mt-2 font-mono text-sm">
                            <div>Bank: My Robot Bank</div>
                            <div>Account: 1234567890</div>
                            <div>IBAN: AE123456789012345678</div>
                            <div>Reference: {eventId}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-primary mt-6"
                    >
                      {language === 'en' 
                        ? `Pay $${event.price}` 
                        : `ادفع $${event.price}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventDetail;
