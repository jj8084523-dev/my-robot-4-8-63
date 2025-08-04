
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import ParentProfile from "@/components/parent/ParentProfile";
import ParentChildren from "@/components/parent/ParentChildren";
import { getUsers } from "@/lib/localStorage";
import { toast } from "sonner";
import { Plus } from "lucide-react";


const ParentDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-myrobot-navy">
              {language === "en" ? "Parent Dashboard" : "لوحة تحكم ولي الأمر"}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === "en" 
                ? "Manage your profile and your children's information" 
                : "إدارة ملفك الشخصي ومعلومات أطفالك"
              }
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="mr-2"
            >
              {language === "en" ? "Back to Home" : "العودة للرئيسية"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">
              {language === "en" ? "My Profile" : "ملفي الشخصي"}
            </TabsTrigger>
            <TabsTrigger value="children">
              {language === "en" ? "My Children" : "أطفالي"}
            </TabsTrigger>
            <TabsTrigger value="courses">
              {language === "en" ? "Enrolled Courses" : "الدورات المسجلة"}
            </TabsTrigger>
            <TabsTrigger value="payments">
              {language === "en" ? "Payment History" : "سجل المدفوعات"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ParentProfile />
          </TabsContent>
          
          <TabsContent value="children">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {language === "en" ? "My Children" : "أطفالي"}
                </h3>
              </div>
              <ParentChildren />
            </div>
          </TabsContent>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Enrolled Courses" : "الدورات المسجلة"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  {language === "en" 
                    ? "Your children are not enrolled in any courses yet." 
                    : "لم يتم تسجيل أطفالك في أي دورات بعد."
                  }
                </p>
                <Button 
                  onClick={() => navigate("/programs")} 
                  className="mt-4 btn-primary"
                >
                  {language === "en" ? "Browse Courses" : "تصفح الدورات"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Payment History" : "سجل المدفوعات"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  {language === "en" 
                    ? "You have no payment history yet." 
                    : "ليس لديك سجل مدفوعات حتى الآن."
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ParentDashboard;
