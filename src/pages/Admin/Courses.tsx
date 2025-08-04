
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getCourses, addCourse, deleteCourse, updateCourse, type Course } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Filter, Users, ArrowDown, ArrowUp, Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Form schema for course creation
const courseFormSchema = z.object({
  name: z.string().min(3, { message: "Course name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  ageRangeMin: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 7 && num <= 16;
  }, { message: "Minimum age must be between 7-16" }),
  ageRangeMax: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 7 && num <= 16;
  }, { message: "Maximum age must be between 7-16" }),
  schedule: z.string().min(3, { message: "Schedule is required" }),
  capacity: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num <= 30;
  }, { message: "Capacity must be between 1-30" }),
  coordinator: z.string().min(3, { message: "Coordinator is required" }),
  price: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num <= 1000;
  }, { message: "Price must be between 1-1000" }),
});

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Load courses from localStorage on component mount
    const savedCourses = getCourses();
    setCourses(savedCourses);
  }, []);
  
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      level: "Beginner",
      ageRangeMin: "7",
      ageRangeMax: "10",
      schedule: "",
      capacity: "20",
      coordinator: "",
      price: "150",
    },
  });

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCourses = sortConfig
    ? [...filteredCourses].sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      })
    : filteredCourses;

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
    return sortConfig.direction === "ascending" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
    const courseData = {
      name: values.name,
      level: values.level,
      ageRange: `${values.ageRangeMin}-${values.ageRangeMax}`,
      enrolled: editingCourse?.enrolled || 0,
      capacity: parseInt(values.capacity),
      schedule: values.schedule,
      coordinator: values.coordinator,
      description: values.description,
      price: parseInt(values.price)
    };
    
    if (editingCourse) {
      // Update existing course
      updateCourse(editingCourse.id, courseData);
      toast.success("Course updated successfully!");
    } else {
      // Add new course
      addCourse(courseData);
      toast.success("Course created successfully!");
    }
    
    // Update local state
    const updatedCourses = getCourses();
    setCourses(updatedCourses);
    
    // Close dialog and reset form
    setIsOpen(false);
    setEditingCourse(null);
    form.reset();
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    const [minAge, maxAge] = course.ageRange.split('-');
    form.reset({
      name: course.name,
      description: course.description || "",
      level: course.level as "Beginner" | "Intermediate" | "Advanced",
      ageRangeMin: minAge,
      ageRangeMax: maxAge,
      schedule: course.schedule,
      capacity: course.capacity.toString(),
      coordinator: course.coordinator,
      price: course.price?.toString() || "150",
    });
    setIsOpen(true);
  };

  const handleDeleteCourse = (id: string) => {
    // Delete course from localStorage
    deleteCourse(id);
    
    // Update local state
    const updatedCourses = getCourses();
    setCourses(updatedCourses);
    
    // Show success toast
    toast.success("Course deleted successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-myrobot-navy">Courses Management</h1>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={() => { setEditingCourse(null); form.reset(); }}>
                <Plus size={18} className="mr-1" />
                Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
                <DialogDescription>
                  {editingCourse ? "Update the course details below." : "Add a new course to the academy. Fill in all the required details below."}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Robotics 101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what students will learn in this course" 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Capacity</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="30" {...field} />
                          </FormControl>
                          <FormDescription>Maximum number of students (1-30)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="ageRangeMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Age</FormLabel>
                          <FormControl>
                            <Input type="number" min="7" max="16" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ageRangeMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Age</FormLabel>
                          <FormControl>
                            <Input type="number" min="7" max="16" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Schedule</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mon, Wed 4-6 PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coordinator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Coordinator</FormLabel>
                        <FormControl>
                          <Input placeholder="Coordinator name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="1000" placeholder="150" {...field} />
                        </FormControl>
                        <FormDescription>Course price in USD (1-1000)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-primary">
                      {editingCourse ? "Update Course" : "Create Course"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                Filter
              </Button>
            </div>

            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <button 
                        className="flex items-center gap-1" 
                        onClick={() => requestSort('name')}
                      >
                        Course Name {getSortIcon('name')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button 
                        className="flex items-center gap-1" 
                        onClick={() => requestSort('level')}
                      >
                        Level {getSortIcon('level')}
                      </button>
                    </TableHead>
                    <TableHead>Age Range</TableHead>
                    <TableHead>
                      <button 
                        className="flex items-center gap-1" 
                        onClick={() => requestSort('enrolled')}
                      >
                        Enrolled {getSortIcon('enrolled')}
                      </button>
                    </TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Coordinator</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          course.level === "Beginner" ? "bg-green-100 text-green-800" :
                          course.level === "Intermediate" ? "bg-blue-100 text-blue-800" :
                          "bg-purple-100 text-purple-800"
                        }`}>
                          {course.level}
                        </span>
                      </TableCell>
                      <TableCell>{course.ageRange}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>
                            {course.enrolled}/{course.capacity}
                          </span>
                          <Users size={16} className="text-gray-500" />
                        </div>
                      </TableCell>
                      <TableCell>{course.schedule}</TableCell>
                      <TableCell>{course.coordinator}</TableCell>
                      <TableCell>${course.price || 150}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditCourse(course)}
                          >
                            <Edit size={16} className="text-blue-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash size={16} className="text-red-600" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sortedCourses.length === 0 && (
                     <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No courses found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Showing {sortedCourses.length} of {courses.length} courses
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCourses;
