import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit2, Trash2, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { getUsers, addUser, updateUser, deleteUser, User, getCourses } from "@/lib/localStorage";

const AdminCoordinators = () => {
  const [coordinators, setCoordinators] = useState<User[]>(
    getUsers().filter(user => user.role === 'coordinator')
  );
  const [courses] = useState(getCourses());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCoordinator, setEditingCoordinator] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    courseIds: [] as string[],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      courseIds: [],
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingCoordinator) {
      updateUser(editingCoordinator.id, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        courseIds: formData.courseIds,
      });
      toast.success("Coordinator updated successfully!");
      setEditingCoordinator(null);
    } else {
      // Check if email already exists
      const existingUsers = getUsers();
      if (existingUsers.some(user => user.email === formData.email)) {
        toast.error("Email already exists!");
        return;
      }

      addUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'coordinator',
        courseIds: formData.courseIds,
      });
      toast.success("Coordinator added successfully!");
      setIsAddDialogOpen(false);
    }

    setCoordinators(getUsers().filter(user => user.role === 'coordinator'));
    resetForm();
  };

  const handleEdit = (coordinator: User) => {
    setEditingCoordinator(coordinator);
    setFormData({
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

  const handleCourseToggle = (courseId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        courseIds: [...formData.courseIds, courseId]
      });
    } else {
      setFormData({
        ...formData,
        courseIds: formData.courseIds.filter(id => id !== courseId)
      });
    }
  };

  const getCoordinatorCourses = (courseIds: string[] = []) => {
    return courses.filter(course => courseIds.includes(course.id));
  };

  const CoordinatorForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter coordinator's full name"
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email address"
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Enter password"
        />
      </div>
      
      <div>
        <Label>Assigned Courses</Label>
        <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center space-x-2">
              <Checkbox
                id={course.id}
                checked={formData.courseIds.includes(course.id)}
                onCheckedChange={(checked) => handleCourseToggle(course.id, checked as boolean)}
              />
              <Label htmlFor={course.id} className="text-sm">
                {course.name} - {course.level}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={() => {
          setIsAddDialogOpen(false);
          setEditingCoordinator(null);
          resetForm();
        }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {editingCoordinator ? "Update Coordinator" : "Add Coordinator"}
        </Button>
      </div>
    </div>
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
            resetForm();
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