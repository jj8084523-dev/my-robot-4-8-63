import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Edit2, Trash2, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getEvents, addEvent, updateEvent, deleteEvent, Event } from "@/lib/localStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form schema for event creation
const eventFormSchema = z.object({
  title: z.string().min(3, { message: "Event title is required" }),
  titleAr: z.string().min(3, { message: "Arabic title is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  descriptionAr: z.string().min(10, { message: "Arabic description must be at least 10 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(3, { message: "Time is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  locationAr: z.string().min(3, { message: "Arabic location is required" }),
  capacity: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num <= 500;
  }, { message: "Capacity must be between 1-500" }),
  price: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 1000;
  }, { message: "Price must be between 0-1000" }),
  category: z.enum(["workshop", "competition", "exhibition", "graduation", "other"]),
  image: z.string().url({ message: "Must be a valid URL" }).or(z.literal("")),
});

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>(getEvents());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      date: "",
      time: "",
      location: "",
      locationAr: "",
      capacity: "30",
      price: "0",
      category: "workshop",
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof eventFormSchema>) => {
    const eventData = {
      title: values.title,
      titleAr: values.titleAr,
      description: values.description,
      descriptionAr: values.descriptionAr,
      date: values.date,
      time: values.time,
      location: values.location,
      locationAr: values.locationAr,
      capacity: parseInt(values.capacity),
      price: parseFloat(values.price),
      category: values.category,
      image: values.image || "/placeholder.svg",
      enrolled: editingEvent ? editingEvent.enrolled : 0
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      toast.success("Event updated successfully!");
      setEditingEvent(null);
    } else {
      addEvent(eventData);
      toast.success("Event added successfully!");
      setIsAddDialogOpen(false);
    }

    setEvents(getEvents());
    form.reset();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    form.reset({
      title: event.title,
      titleAr: event.titleAr,
      description: event.description,
      descriptionAr: event.descriptionAr,
      date: event.date,
      time: event.time,
      location: event.location,
      locationAr: event.locationAr,
      capacity: event.capacity.toString(),
      price: event.price.toString(),
      category: event.category as any,
      image: event.image,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
    setEvents(getEvents());
    toast.success("Event deleted successfully!");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workshop': return 'bg-blue-100 text-blue-800';
      case 'competition': return 'bg-red-100 text-red-800';
      case 'exhibition': return 'bg-green-100 text-green-800';
      case 'graduation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EventForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title (English)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="titleAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title (Arabic)</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل عنوان الفعالية" dir="rtl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (English)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter event description" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="descriptionAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Arabic)</FormLabel>
                <FormControl>
                  <Textarea placeholder="أدخل وصف الفعالية" dir="rtl" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 9:00 AM - 4:00 PM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (English)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="locationAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (Arabic)</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل موقع الفعالية" dir="rtl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="500" placeholder="Max participants" {...field} />
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
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" max="1000" placeholder="Event price" {...field} />
                </FormControl>
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
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                    <SelectItem value="exhibition">Exhibition</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={() => {
            setIsAddDialogOpen(false);
            setEditingEvent(null);
            form.reset();
          }}>
            Cancel
          </Button>
          <Button type="submit">
            {editingEvent ? "Update Event" : "Add Event"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-myrobot-navy">Events Management</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Fill in all the event details below. Most fields are required.
                </DialogDescription>
              </DialogHeader>
              <EventForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-myrobot-navy line-clamp-2">
                    {event.title}
                  </CardTitle>
                  <div className="flex space-x-2 ml-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {event.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first event.</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Edit Event Dialog */}
        <Dialog open={!!editingEvent} onOpenChange={(open) => {
          if (!open) {
            setEditingEvent(null);
            form.reset();
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>
                Update the event details below. Most fields are required.
              </DialogDescription>
            </DialogHeader>
            <EventForm />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminEvents;