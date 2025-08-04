import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Trophy, User } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  const isArabic = language === 'ar';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-myrobot-navy">
            {isArabic ? "لوحة تحكم الطالب" : "Student Dashboard"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isArabic ? `أهلاً بك، ${user?.name}` : `Welcome back, ${user?.name}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? "الدورات المسجلة" : "Enrolled Courses"}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? "دورات نشطة" : "Active courses"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? "الفعاليات القادمة" : "Upcoming Events"}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? "هذا الأسبوع" : "This week"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? "الإنجازات" : "Achievements"}
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? "شهادات مكتسبة" : "Certificates earned"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? "معدل الحضور" : "Attendance Rate"}
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? "هذا الشهر" : "This month"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "الدورات الحالية" : "Current Courses"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{isArabic ? "البرمجة الأساسية" : "Basic Programming"}</h3>
                    <p className="text-sm text-gray-600">{isArabic ? "التقدم: 75%" : "Progress: 75%"}</p>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-3/4 h-full bg-myrobot-orange rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{isArabic ? "الروبوتات المتقدمة" : "Advanced Robotics"}</h3>
                    <p className="text-sm text-gray-600">{isArabic ? "التقدم: 45%" : "Progress: 45%"}</p>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-2/5 h-full bg-myrobot-orange rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{isArabic ? "الذكاء الاصطناعي" : "Artificial Intelligence"}</h3>
                    <p className="text-sm text-gray-600">{isArabic ? "التقدم: 20%" : "Progress: 20%"}</p>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/5 h-full bg-myrobot-orange rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "الفعاليات القادمة" : "Upcoming Events"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{isArabic ? "مسابقة الروبوت" : "Robot Competition"}</h3>
                  <p className="text-sm text-gray-600">{isArabic ? "15 يناير 2024" : "January 15, 2024"}</p>
                  <p className="text-sm">{isArabic ? "مسابقة سنوية للروبوتات" : "Annual robotics competition"}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{isArabic ? "ورشة الذكاء الاصطناعي" : "AI Workshop"}</h3>
                  <p className="text-sm text-gray-600">{isArabic ? "22 يناير 2024" : "January 22, 2024"}</p>
                  <p className="text-sm">{isArabic ? "تعلم أساسيات الذكاء الاصطناعي" : "Learn AI fundamentals"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;