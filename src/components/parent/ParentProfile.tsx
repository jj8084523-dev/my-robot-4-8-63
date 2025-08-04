
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  preferredLanguage: z.enum(["english", "arabic"]),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ParentProfile = () => {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  
  // Demo profile data for the simulated user
  const defaultValues: ProfileFormValues = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St",
    city: "New York",
    country: "United States",
    preferredLanguage: "english",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, this would update the user profile in the database
    console.log("Profile update:", data);
    toast.success(
      language === "en"
        ? "Profile updated successfully!"
        : "تم تحديث الملف الشخصي بنجاح!"
    );
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {language === "en" ? "My Profile" : "ملفي الشخصي"}
          </CardTitle>
          <Button 
            variant={isEditing ? "outline" : "default"} 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing 
              ? (language === "en" ? "Cancel" : "إلغاء") 
              : (language === "en" ? "Edit Profile" : "تعديل الملف")
            }
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "en" ? "Full Name" : "الاسم الكامل"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={!isEditing}
                      />
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
                    <FormLabel>
                      {language === "en" ? "Email" : "البريد الإلكتروني"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={!isEditing} 
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "en" ? "Phone Number" : "رقم الهاتف"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "en" ? "Preferred Language" : "اللغة المفضلة"}
                    </FormLabel>
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={language === "en" ? "Select language" : "اختر اللغة"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="arabic">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === "en" ? "Address" : "العنوان"}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      disabled={!isEditing}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "en" ? "City" : "المدينة"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={!isEditing}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "en" ? "Country" : "الدولة"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={!isEditing}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isEditing && (
              <Button type="submit" className="btn-primary">
                {language === "en" ? "Save Changes" : "حفظ التغييرات"}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ParentProfile;
