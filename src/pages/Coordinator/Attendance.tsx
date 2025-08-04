import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock attendance data
const mockAttendance = [
  {
    id: "1",
    courseId: "1",
    courseName: "Robotics 101",
    date: new Date(2023, 8, 15), // September 15, 2023
    students: [
      { id: "1", name: "Alex Johnson", status: "Present" },
      { id: "2", name: "Emma Williams", status: "Absent" },
      { id: "3", name: "Ryan Davis", status: "Present" },
      { id: "4", name: "Sophie Miller", status: "Excused" },
      { id: "5", name: "Lucas Brown", status: "Present" },
    ],
  },
  {
    id: "2",
    courseId: "2",
    courseName: "Arduino Electronics",
    date: new Date(2023, 8, 16), // September 16, 2023
    students: [
      { id: "6", name: "Olivia Taylor", status: "Present" },
      { id: "7", name: "Noah Anderson", status: "Present" },
      { id: "8", name: "Ava Martinez", status: "Absent" },
      { id: "9", name: "William Thompson", status: "Present" },
    ],
  },
];

// Mock courses for the dropdown
const mockCourses = [
  { id: "1", name: "Robotics 101" },
  { id: "2", name: "Arduino Electronics" },
  { id: "3", name: "Programming for Kids" },
];

const CoordinatorAttendance = () => {
  const { language } = useLanguage();
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendance);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: string) => {
    if (!sortConfig || sortConfig.key !== name) {
      return null;
    }
    return sortConfig.direction === "ascending" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  // Filter the attendance records based on selected course and date
  const filteredRecords = attendanceRecords.filter((record) => {
    const courseMatch = selectedCourse === "all" || record.courseId === selectedCourse;
    const dateMatch = !selectedDate || format(record.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
    return courseMatch && dateMatch;
  });

  // Calculate statistics
  const calculateStats = (record: typeof attendanceRecords[0]) => {
    const total = record.students.length;
    const present = record.students.filter(s => s.status === "Present").length;
    const absent = record.students.filter(s => s.status === "Absent").length;
    const excused = record.students.filter(s => s.status === "Excused").length;
    
    return {
      total,
      present,
      absent,
      excused,
      presentPercentage: Math.round((present / total) * 100),
    };
  };

  const updateAttendance = (recordId: string, studentId: string, newStatus: "Present" | "Absent" | "Excused") => {
    const updatedRecords = attendanceRecords.map(record => {
      if (record.id === recordId) {
        const updatedStudents = record.students.map(student => {
          if (student.id === studentId) {
            return { ...student, status: newStatus };
          }
          return student;
        });
        return { ...record, students: updatedStudents };
      }
      return record;
    });
    
    setAttendanceRecords(updatedRecords);
    toast.success(`Attendance updated to ${newStatus}`);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-myrobot-navy">
              {language === "en" ? "Attendance Tracking" : "تتبع الحضور"}
            </h1>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {language === "en" ? "Export CSV" : "تصدير CSV"}
              </Button>
              <Button className="btn-primary">
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {language === "en" ? "New Session" : "جلسة جديدة"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">
                  {language === "en" ? "Filter Attendance" : "تصفية الحضور"}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {language === "en" ? "Course" : "الدورة"}
                    </label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === "en" ? "Select course" : "اختر الدورة"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {language === "en" ? "All Courses" : "جميع الدورات"}
                        </SelectItem>
                        {mockCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {language === "en" ? "Date" : "التاريخ"}
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>{language === "en" ? "Pick a date" : "اختر تاريخ"}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        setSelectedCourse("all");
                        setSelectedDate(undefined);
                      }}
                    >
                      {language === "en" ? "Reset Filters" : "إعادة تعيين التصفية"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <CalendarIcon size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium">
                      {language === "en" ? "No attendance records found" : "لم يتم العثور على سجلات حضور"}
                    </h3>
                    <p className="text-gray-500 mt-1">
                      {language === "en" ? "Try adjusting your filters" : "حاول تعديل التصفية"}
                    </p>
                  </div>
                ) : (
                  filteredRecords.map((record) => {
                    const stats = calculateStats(record);
                    
                    return (
                      <div key={record.id} className="mb-8 last:mb-0">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="text-lg font-medium">{record.courseName}</h3>
                            <p className="text-gray-500">{format(record.date, "EEEE, MMMM d, yyyy")}</p>
                          </div>
                          
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs">
                              {language === "en" ? "Present" : "حاضر"}: {stats.present}/{stats.total} ({stats.presentPercentage}%)
                            </div>
                            <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-xs">
                              {language === "en" ? "Absent" : "غائب"}: {stats.absent}
                            </div>
                            <div className="bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-xs">
                              {language === "en" ? "Excused" : "معذور"}: {stats.excused}
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-500 rounded-md border">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  {language === "en" ? "Student Name" : "اسم الطالب"}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  {language === "en" ? "Status" : "الحالة"}
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                  {language === "en" ? "Actions" : "الإجراءات"}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {record.students.map((student) => (
                                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    {student.name}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        student.status === "Present"
                                          ? "bg-green-100 text-green-800"
                                          : student.status === "Absent"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-amber-100 text-amber-800"
                                      }`}
                                    >
                                      {student.status === "Present" 
                                        ? (language === "en" ? "Present" : "حاضر")
                                        : student.status === "Absent"
                                        ? (language === "en" ? "Absent" : "غائب")
                                        : (language === "en" ? "Excused" : "معذور")
                                      }
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          {language === "en" ? "Update Status" : "تحديث الحالة"}
                                          <ChevronDown size={14} className="ml-1" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => updateAttendance(record.id, student.id, "Present")}>
                                          <Check size={14} className="mr-2 text-green-600" />
                                          {language === "en" ? "Present" : "حاضر"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => updateAttendance(record.id, student.id, "Absent")}>
                                          <svg className="w-3.5 h-3.5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                          {language === "en" ? "Absent" : "غائب"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => updateAttendance(record.id, student.id, "Excused")}>
                                          <svg className="w-3.5 h-3.5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          {language === "en" ? "Excused" : "معذور"}
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoordinatorAttendance;