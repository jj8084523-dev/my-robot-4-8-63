import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Edit2, Trash2, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { getUsers, addUser, updateUser, deleteUser, User, getCourses } from "@/lib/localStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form schema for coordinator creation
const coordinatorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  courseIds: z.array(z.string()).optional(),
});

const AdminCoordinators = () => {
  const [coordinators, setCoordinators] = useState<User[]>(
    getUsers().filter(user => user.role === 'coordinator')
  );
  const [courses] = useState(getCourses());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCoordinator, setEditingCoordinator] = useState<User | null>(null);

  const form = useForm<z.infer<typeof coordinatorFormSchema>>({
    resolver: zodResolver(coordinatorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      courseIds: [],
    },
  });

  const onSubmit = (values: z.infer<typeof coordinatorFormSchema>) => {
    if (editingCoordinator) {
      updateUser(editingCoordinator.id, {
        name: values.name,
        email: values.email,
        password: values.password,
        courseIds: values.courseIds || [],
      });
      toast.success("Coordinator updated successfully!");
      setEditingCoordinator(null);
    } else {
      // Check if email already exists
      const existingUsers = getUsers();
      if (existingUsers.some(user => user.email === values.email)) {
        toast.error("Email already exists!");
        return;
      }

      addUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'coordinator',
        courseIds: values.courseIds || [],
      });
      toast.success("Coordinator added successfully!");
      setIsAddDialogOpen(false);
    }

    setCoordinators(getUsers().filter(user => user.role === 'coordinator'));
    form.reset();
  };

  const handleEdit = (coordinator: User) => {
    setEditingCoordinator(coordinator);
    form.reset({
      name: coordinator.name,
      email: coordinator.email,
      password: coordinator.password,
      courseIds: coordinator.courseIds || [],
    });
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    setCoordinators(getUsers().filter(user => user.role === 'coordinator'));
    toast.success("Coordinator deleted successfully!");
  };

  const getCoordinatorCourses = (courseIds: string[] = []) => {
    return courses.filter(course => courseIds.includes(course.id));
  };

  const CoordinatorForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter coordinator's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email address" {...field} />
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
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="courseIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Courses</FormLabel>
              <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={course.id}
                      checked={field.value?.includes(course.id) || false}
                      onCheckedChange={(checked) => {
                        const currentIds = field.value || [];
                        if (checked) {
                          field.onChange([...currentIds, course.id]);
                        } else {
                          field.onChange(currentIds.filter(id => id !== course.id));
                        }
                      }}
                    />
                    <Label htmlFor={course.id} className="text-sm">
                      {course.name} - {course.level}
                    </Label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={() => {
            setIsAddDialogOpen(false);
            setEditingCoordinator(null);
            form.reset();
          }}>
            Cancel
          </Button>
          <Button type="submit">
            {editingCoordinator ? "Update Coordinator" : "Add Coordinator"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-myrobot-navy">Coordinators Management</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Coordinator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Coordinator</DialogTitle>
                <DialogDescription>
                  Create a new coordinator account and assign courses.
                </DialogDescription>
              </DialogHeader>
              <CoordinatorForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coordinators.map((coordinator) => {
            const assignedCourses = getCoordinatorCourses(coordinator.courseIds);
            
            return (
              <Card key={coordinator.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold text-myrobot-navy">
                        {coordinator.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{coordinator.email}</p>
                    </div>
                    <div className="flex space-x-2 ml-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(coordinator)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(coordinator.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{assignedCourses.length} Course(s) Assigned</span>
                  </div>
                  
                  {assignedCourses.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Assigned Courses:</Label>
                      <div className="flex flex-wrap gap-1">
                        {assignedCourses.map((course) => (
                          <Badge key={course.id} variant="outline" className="text-xs">
                            {course.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-400">
                    Created: {new Date(coordinator.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {coordinators.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No coordinators yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first coordinator.</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Coordinator
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Edit Coordinator Dialog */}
        <Dialog open={!!editingCoordinator} onOpenChange={(open) => {
          if (!open) {
            setEditingCoordinator(null);
            form.reset();
          }
        }}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Coordinator</DialogTitle>
              <DialogDescription>
                Update coordinator information and course assignments.
              </DialogDescription>
            </DialogHeader>
            <CoordinatorForm />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminCoordinators;