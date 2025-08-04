import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getAchievements, addAchievement, deleteAchievement, updateAchievement, type Achievement } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Edit, Trash, Trophy, Award, Users, Target, Star } from "lucide-react";
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

const achievementFormSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.string().min(3, { message: "Date is required" }),
  icon: z.enum(["Trophy", "Award", "Users", "Target", "Star"]),
  image: z.string().url({ message: "Please enter a valid image URL" }),
});

const iconOptions = [
  { value: "Trophy", label: "Trophy", icon: <Trophy size={20} /> },
  { value: "Award", label: "Award", icon: <Award size={20} /> },
  { value: "Users", label: "Users", icon: <Users size={20} /> },
  { value: "Target", label: "Target", icon: <Target size={20} /> },
  { value: "Star", label: "Star", icon: <Star size={20} /> },
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Trophy": return <Trophy size={48} className="text-myrobot-orange" />;
    case "Award": return <Award size={48} className="text-myrobot-orange" />;
    case "Users": return <Users size={48} className="text-myrobot-orange" />;
    case "Target": return <Target size={48} className="text-myrobot-orange" />;
    case "Star": return <Star size={48} className="text-myrobot-orange" />;
    default: return <Trophy size={48} className="text-myrobot-orange" />;
  }
};

const AdminAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  
  const form = useForm<z.infer<typeof achievementFormSchema>>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      icon: "Trophy",
      image: "",
    },
  });

  useEffect(() => {
    const savedAchievements = getAchievements();
    setAchievements(savedAchievements);
  }, []);

  const filteredAchievements = achievements.filter((achievement) =>
    achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (values: z.infer<typeof achievementFormSchema>) => {
    const achievementData = {
      title: values.title,
      description: values.description,
      date: values.date,
      icon: values.icon,
      image: values.image,
    };
    
    if (editingAchievement) {
      updateAchievement(editingAchievement.id, achievementData);
      toast.success("Achievement updated successfully!");
    } else {
      addAchievement(achievementData);
      toast.success("Achievement added successfully!");
    }
    
    const updatedAchievements = getAchievements();
    setAchievements(updatedAchievements);
    
    setIsOpen(false);
    setEditingAchievement(null);
    form.reset();
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    form.reset({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      icon: achievement.icon as "Trophy" | "Award" | "Users" | "Target" | "Star",
      image: achievement.image,
    });
    setIsOpen(true);
  };

  const handleDeleteAchievement = (id: string) => {
    deleteAchievement(id);
    const updatedAchievements = getAchievements();
    setAchievements(updatedAchievements);
    toast.success("Achievement deleted successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-myrobot-navy">Achievements Management</h1>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={() => { setEditingAchievement(null); form.reset(); }}>
                <Plus size={18} className="mr-1" />
                Add Achievement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingAchievement ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
                <DialogDescription>
                  {editingAchievement ? "Update the achievement details below." : "Add a new achievement to showcase. Fill in all the required details below."}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Regional Robotics Champions" {...field} />
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
                            placeholder="Describe the achievement" 
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
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. March 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select icon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {iconOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    {option.icon}
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-primary">
                      {editingAchievement ? "Update Achievement" : "Add Achievement"}
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
                  placeholder="Search achievements..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <div key={achievement.id} className="card group hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-myrobot-orange/10 p-3 rounded-xl">
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="text-myrobot-gray text-sm mb-1">{achievement.date}</div>
                      <h3 className="font-bold text-lg text-myrobot-navy">{achievement.title}</h3>
                    </div>
                  </div>
                  <p className="text-myrobot-gray mb-4 line-clamp-3">{achievement.description}</p>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditAchievement(achievement)}
                    >
                      <Edit size={16} className="text-blue-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteAchievement(achievement.id)}
                    >
                      <Trash size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredAchievements.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No achievements found. Try adjusting your search.
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredAchievements.length} of {achievements.length} achievements
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAchievements;