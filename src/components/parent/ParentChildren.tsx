
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { getChildren, addChild, updateChild, deleteChild, type Child, hasChildAccount, addUser, getUsers } from "@/lib/localStorage";
import { PlusCircle, Pencil, Trash2, UserPlus, CheckCircle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const childFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().min(1, { message: "Age is required" }),
  grade: z.string().min(1, { message: "Grade is required" }),
  interests: z.string().optional(),
});

type ChildFormValues = z.infer<typeof childFormSchema>;

const ParentChildren = () => {
  const { language } = useLanguage();
  const [children, setChildren] = useState<Child[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [currentChildId, setCurrentChildId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [accountForm, setAccountForm] = useState({ email: "", password: "" });

  useEffect(() => {
    // Load children from localStorage on component mount
    const savedChildren = getChildren();
    setChildren(savedChildren);
  }, []);
  
  const form = useForm<ChildFormValues>({
    resolver: zodResolver(childFormSchema),
    defaultValues: {
      name: "",
      age: "",
      grade: "",
      interests: "",
    },
  });

  const onOpenDialog = (childId?: number) => {
    if (childId) {
      const child = children.find((c) => c.id === childId);
      if (child) {
        form.reset({
          name: child.name,
          age: child.age,
          grade: child.grade,
          interests: child.interests,
        });
        setCurrentChildId(childId);
        setIsEditing(true);
      }
    } else {
      form.reset({
        name: "",
        age: "",
        grade: "",
        interests: "",
      });
      setCurrentChildId(null);
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  const onSubmit = (data: ChildFormValues) => {
    if (isEditing && currentChildId) {
      // Update existing child
      updateChild(currentChildId, data);
      const updatedChildren = getChildren();
      setChildren(updatedChildren);
      toast.success(
        language === "en"
          ? "Child information updated successfully!"
          : "تم تحديث معلومات الطفل بنجاح!"
      );
    } else {
      // Add new child
      const newChild = addChild({
        name: data.name || '',
        age: data.age || '',
        grade: data.grade || '',
        interests: data.interests || '',
      });
      const updatedChildren = getChildren();
      setChildren(updatedChildren);
      toast.success(
        language === "en"
          ? "Child added successfully!"
          : "تمت إضافة الطفل بنجاح!"
      );
    }
    onCloseDialog();
  };

  const onDeleteChild = (childId: number) => {
    setCurrentChildId(childId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteChild = () => {
    if (currentChildId) {
      deleteChild(currentChildId);
      const updatedChildren = getChildren();
      setChildren(updatedChildren);
      toast.success(
        language === "en"
          ? "Child removed successfully!"
          : "تمت إزالة الطفل بنجاح!"
      );
      setIsDeleteDialogOpen(false);
    }
  };

  const onCreateAccount = (childId: number) => {
    setCurrentChildId(childId);
    setAccountForm({ email: "", password: "" });
    setIsAccountDialogOpen(true);
  };

  const handleCreateAccount = () => {
    if (!currentChildId || !accountForm.email || !accountForm.password) {
      toast.error(language === "en" ? "Please fill in all fields" : "يرجى ملء جميع الحقول");
      return;
    }

    // Check if email already exists
    const existingUsers = getUsers();
    if (existingUsers.some(user => user.email === accountForm.email)) {
      toast.error(language === "en" ? "Email already exists!" : "البريد الإلكتروني موجود بالفعل!");
      return;
    }

    const child = children.find(c => c.id === currentChildId);
    if (!child) return;

    // Get current parent ID (mock - in real app would come from auth)
    const parentId = "parent-1";

    addUser({
      name: child.name,
      email: accountForm.email,
      password: accountForm.password,
      role: 'child',
      parentId: parentId,
      childId: currentChildId,
    });

    toast.success(language === "en" ? "Child account created successfully!" : "تم إنشاء حساب الطفل بنجاح!");
    setIsAccountDialogOpen(false);
    setAccountForm({ email: "", password: "" });
    // Force re-render to update UI
    setChildren([...children]);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {language === "en" ? "My Children" : "أطفالي"}
              </CardTitle>
              <CardDescription>
                {language === "en" 
                  ? "Manage your children's information" 
                  : "إدارة معلومات أطفالك"
                }
              </CardDescription>
            </div>
            <Button 
              onClick={() => onOpenDialog()}
              className="btn-primary"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {language === "en" ? "Add Child" : "إضافة طفل"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {children.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {language === "en" 
                  ? "No children added yet. Add a child to get started." 
                  : "لم تتم إضافة أي أطفال بعد. أضف طفلًا للبدء."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {children.map((child) => (
                <Card key={child.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{child.name}</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                          <div>
                            <span className="font-medium">
                              {language === "en" ? "Age" : "العمر"}:
                            </span>{" "}
                            {child.age}
                          </div>
                          <div>
                            <span className="font-medium">
                              {language === "en" ? "Grade" : "الصف"}:
                            </span>{" "}
                            {child.grade}
                          </div>
                          {child.interests && (
                            <div className="col-span-2">
                              <span className="font-medium">
                                {language === "en" ? "Interests" : "الاهتمامات"}:
                              </span>{" "}
                              {child.interests}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onOpenDialog(child.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => onDeleteChild(child.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {hasChildAccount(child.id) ? (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {language === "en" ? "Has Account" : "لديه حساب"}
                          </div>
                        ) : (
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => onCreateAccount(child.id)}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            {language === "en" ? "Create Account" : "إنشاء حساب"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing 
                ? (language === "en" ? "Edit Child Information" : "تعديل معلومات الطفل") 
                : (language === "en" ? "Add New Child" : "إضافة طفل جديد")
              }
            </DialogTitle>
            <DialogDescription>
              {language === "en" 
                ? "Enter your child's information below." 
                : "أدخل معلومات طفلك أدناه."
              }
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "en" ? "Full Name" : "الاسم الكامل"}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "en" ? "Age" : "العمر"}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={language === "en" ? "Select age" : "اختر العمر"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((age) => (
                            <SelectItem key={age} value={age.toString()}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "en" ? "Grade" : "الصف"}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={language === "en" ? "Select grade" : "اختر الصف"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                            <SelectItem key={grade} value={grade.toString()}>
                              {grade}
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
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "en" ? "Interests (optional)" : "الاهتمامات (اختياري)"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder={language === "en" 
                          ? "e.g. Robotics, Programming, Science" 
                          : "مثل: الروبوتات، البرمجة، العلوم"
                        }
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={onCloseDialog}>
                  {language === "en" ? "Cancel" : "إلغاء"}
                </Button>
                <Button type="submit" className="btn-primary">
                  {isEditing
                    ? (language === "en" ? "Update" : "تحديث")
                    : (language === "en" ? "Add Child" : "إضافة طفل")
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === "en" ? "Are you sure?" : "هل أنت متأكد؟"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "en"
                ? "This action cannot be undone. This will permanently delete your child's information."
                : "لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف معلومات طفلك نهائيًا."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === "en" ? "Cancel" : "إلغاء"}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteChild}
              className="bg-destructive hover:bg-destructive/90"
            >
              {language === "en" ? "Delete" : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Create Account" : "إنشاء حساب"}
            </DialogTitle>
            <DialogDescription>
              {language === "en" 
                ? "Create a login account for your child." 
                : "إنشاء حساب دخول لطفلك."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                {language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}
              </label>
              <Input
                type="email"
                value={accountForm.email}
                onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                placeholder={language === "en" ? "Enter email" : "أدخل البريد الإلكتروني"}
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                {language === "en" ? "Password" : "كلمة المرور"}
              </label>
              <Input
                type="password"
                value={accountForm.password}
                onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })}
                placeholder={language === "en" ? "Enter password" : "أدخل كلمة المرور"}
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setIsAccountDialogOpen(false)}>
              {language === "en" ? "Cancel" : "إلغاء"}
            </Button>
            <Button onClick={handleCreateAccount} className="btn-primary">
              {language === "en" ? "Create Account" : "إنشاء الحساب"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ParentChildren;
