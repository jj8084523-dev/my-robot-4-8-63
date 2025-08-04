import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getGalleryItems, addGalleryItem, deleteGalleryItem, updateGalleryItem, type GalleryItem } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Edit, Trash, Image, Video } from "lucide-react";
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

const galleryFormSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  student: z.string().min(3, { message: "Student name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }),
  type: z.enum(["image", "video"]),
  category: z.enum(["projects", "events"]),
  date: z.string().optional(),
  achievement: z.string().optional(),
});

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  
  const form = useForm<z.infer<typeof galleryFormSchema>>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      title: "",
      student: "",
      description: "",
      image: "",
      type: "image",
      category: "projects",
      date: "",
      achievement: "",
    },
  });

  useEffect(() => {
    const savedItems = getGalleryItems();
    setGalleryItems(savedItems);
  }, []);

  const filteredItems = galleryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (values: z.infer<typeof galleryFormSchema>) => {
    const itemData = {
      title: values.title,
      student: values.student,
      description: values.description,
      image: values.image,
      type: values.type,
      category: values.category,
      date: values.date,
      achievement: values.achievement,
    };
    
    if (editingItem) {
      updateGalleryItem(editingItem.id, itemData);
      toast.success("Gallery item updated successfully!");
    } else {
      addGalleryItem(itemData);
      toast.success("Gallery item added successfully!");
    }
    
    const updatedItems = getGalleryItems();
    setGalleryItems(updatedItems);
    
    setIsOpen(false);
    setEditingItem(null);
    form.reset();
  };

  const handleEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      student: item.student,
      description: item.description,
      image: item.image,
      type: item.type,
      category: item.category,
      date: item.date || "",
      achievement: item.achievement || "",
    });
    setIsOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    deleteGalleryItem(id);
    const updatedItems = getGalleryItems();
    setGalleryItems(updatedItems);
    toast.success("Gallery item deleted successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-myrobot-navy">Gallery Management</h1>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={() => { setEditingItem(null); form.reset(); }}>
                <Plus size={18} className="mr-1" />
                Add Gallery Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Gallery Item" : "Add Gallery Item"}</DialogTitle>
                <DialogDescription>
                  {editingItem ? "Update the gallery item details below." : "Add a new item to the gallery. Fill in all the required details below."}
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
                          <Input placeholder="e.g. Automated Pet Feeder" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="student"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student/Team</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Emma, Age 12" {...field} />
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
                            placeholder="Describe the project or event" 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="projects">Student Projects</SelectItem>
                              <SelectItem value="events">Events</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. March 15, 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="achievement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Achievement (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2nd Place" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-primary">
                      {editingItem ? "Update Item" : "Add Item"}
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
                  placeholder="Search gallery items..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="card group hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      {item.type === "video" && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Video size={12} />
                          Video
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs text-white ${
                        item.category === "projects" ? "bg-blue-500" : "bg-green-500"
                      }`}>
                        {item.category === "projects" ? "Project" : "Event"}
                      </span>
                    </div>
                    {item.achievement && (
                      <div className="absolute top-2 right-2 bg-myrobot-orange text-white px-2 py-1 rounded text-xs">
                        {item.achievement}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-myrobot-navy mb-1">{item.title}</h3>
                  <p className="text-myrobot-orange font-medium text-sm mb-2">{item.student}</p>
                  <p className="text-myrobot-gray text-sm mb-4 line-clamp-3">{item.description}</p>
                  {item.date && (
                    <p className="text-xs text-gray-500 mb-3">{item.date}</p>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit size={16} className="text-blue-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No gallery items found. Try adjusting your search.
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredItems.length} of {galleryItems.length} items
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminGallery;