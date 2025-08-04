import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, Download, Filter } from "lucide-react";

const CoordinatorDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Mock student data
  const [students] = useState([
    {
      id: 1,
      name: "أحمد محمد / Ahmed Mohamed",
      age: 10,
      email: "ahmed@email.com",
      parentEmail: "parent.ahmed@email.com",
      program: "Arduino Programming",
      registrationDate: "2024-01-15",
      status: "active",
      parentPhone: "+966 50 123 4567"
    },
    {
      id: 2,
      name: "سارة أحمد / Sara Ahmed",
      age: 8,
      email: "sara@email.com",
      parentEmail: "parent.sara@email.com",
      program: "Robotics Fundamentals",
      registrationDate: "2024-01-20",
      status: "active",
      parentPhone: "+966 55 987 6543"
    },
    {
      id: 3,
      name: "محمد علي / Mohamed Ali",
      age: 14,
      email: "mohamed@email.com",
      parentEmail: "parent.mohamed@email.com",
      program: "Advanced Engineering",
      registrationDate: "2024-02-01",
      status: "pending",
      parentPhone: "+966 56 456 7890"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'en' ? 'Active' : 'نشط';
      case 'pending': return language === 'en' ? 'Pending' : 'في الانتظار';
      case 'inactive': return language === 'en' ? 'Inactive' : 'غير نشط';
      default: return status;
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-myrobot-navy">
              {language === "en" ? "Coordinator Dashboard" : "لوحة تحكم المنسق"}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === "en" 
                ? "Manage student registrations and academy operations" 
                : "إدارة تسجيلات الطلاب وعمليات الأكاديمية"
              }
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              {language === "en" ? "Back to Home" : "العودة للرئيسية"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/coordinator/attendance")}
            >
              {language === "en" ? "Manage Attendance" : "إدارة الحضور"}
            </Button>
            <Button className="btn-primary">
              <Download size={16} className="mr-1" />
              {language === "en" ? "Export Data" : "تصدير البيانات"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="students">
              {language === "en" ? "Registered Students" : "الطلاب المسجلين"}
            </TabsTrigger>
            <TabsTrigger value="programs">
              {language === "en" ? "Program Overview" : "نظرة عامة على البرامج"}
            </TabsTrigger>
            <TabsTrigger value="reports">
              {language === "en" ? "Reports" : "التقارير"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {language === "en" ? "Student Management" : "إدارة الطلاب"}
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-1" />
                    {language === "en" ? "Filter" : "تصفية"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === "en" ? "Student Name" : "اسم الطالب"}</TableHead>
                        <TableHead>{language === "en" ? "Age" : "العمر"}</TableHead>
                        <TableHead>{language === "en" ? "Program" : "البرنامج"}</TableHead>
                        <TableHead>{language === "en" ? "Parent Contact" : "بيانات ولي الأمر"}</TableHead>
                        <TableHead>{language === "en" ? "Registration Date" : "تاريخ التسجيل"}</TableHead>
                        <TableHead>{language === "en" ? "Status" : "الحالة"}</TableHead>
                        <TableHead>{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.age}</TableCell>
                          <TableCell>{student.program}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{student.parentEmail}</div>
                              <div className="text-gray-500">{student.parentPhone}</div>
                            </div>
                          </TableCell>
                          <TableCell>{student.registrationDate}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(student.status)}>
                              {getStatusText(student.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Program Statistics" : "إحصائيات البرامج"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Robotics Fundamentals</h3>
                    <p className="text-2xl font-bold text-blue-600">1</p>
                    <p className="text-sm text-blue-600">{language === "en" ? "Active Students" : "طلاب نشطون"}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Arduino Programming</h3>
                    <p className="text-2xl font-bold text-green-600">1</p>
                    <p className="text-sm text-green-600">{language === "en" ? "Active Students" : "طلاب نشطون"}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Advanced Engineering</h3>
                    <p className="text-2xl font-bold text-purple-600">1</p>
                    <p className="text-sm text-purple-600">{language === "en" ? "Pending Students" : "طلاب في الانتظار"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Academy Reports" : "تقارير الأكاديمية"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "en" ? "Total Students" : "إجمالي الطلاب"}
                    </h3>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "en" ? "Active Programs" : "البرامج النشطة"}
                    </h3>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "en" ? "Pending Reviews" : "في انتظار المراجعة"}
                    </h3>
                    <p className="text-3xl font-bold">1</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "en" ? "This Month" : "هذا الشهر"}
                    </h3>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CoordinatorDashboard;