import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Phone, Calendar, Shield, Camera, Upload } from "lucide-react";
import { toast } from "sonner";

const AdminProfile = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=400&h=400");
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);

  // Predefined photo options using the placeholder images from context
  const photoOptions = [
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=400&h=400", // Professional man
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&h=400", // Woman with laptop
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=400", // Woman in white shirt
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=400", // Code on monitor
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=400", // MacBook with code
  ];

  const handlePhotoSelect = (photoUrl: string) => {
    setProfileImage(photoUrl);
    setIsPhotoDialogOpen(false);
    toast.success("Profile photo updated successfully!");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        setIsPhotoDialogOpen(false);
        toast.success("Profile photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-myrobot-navy">Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-4 relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileImage} alt="Admin" />
                  <AvatarFallback className="text-2xl">AD</AvatarFallback>
                </Avatar>
                
                {/* Photo Change Button */}
                <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-myrobot-orange hover:bg-myrobot-orange/90"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Change Profile Photo</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      {/* File Upload Option */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 mb-3">Upload your own photo</p>
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Button variant="outline" className="btn-outline" asChild>
                            <span>Choose File</span>
                          </Button>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                      
                      {/* Predefined Photo Options */}
                      <div>
                        <p className="text-sm font-medium mb-3">Or choose from preset photos:</p>
                        <div className="grid grid-cols-3 gap-3">
                          {photoOptions.map((photo, index) => (
                            <button
                              key={index}
                              onClick={() => handlePhotoSelect(photo)}
                              className={`relative rounded-lg overflow-hidden border-2 transition-all hover:border-myrobot-orange ${
                                profileImage === photo ? 'border-myrobot-orange' : 'border-gray-200'
                              }`}
                            >
                              <img 
                                src={photo} 
                                alt={`Option ${index + 1}`} 
                                className="w-full h-16 object-cover"
                              />
                              {profileImage === photo && (
                                <div className="absolute inset-0 bg-myrobot-orange/20 flex items-center justify-center">
                                  <div className="w-4 h-4 bg-myrobot-orange rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardTitle className="text-xl">{user?.name || 'Admin User'}</CardTitle>
              <div className="flex justify-center">
                <Badge variant="secondary" className="mt-2">
                  <Shield className="w-4 h-4 mr-1" />
                  {user?.role || 'Admin'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {user?.email || 'admin@myrobot.com'}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined January 2024
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || 'admin@myrobot.com'} />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Administration" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={user?.role || 'Admin'} disabled />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="btn-primary">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button className="btn-primary">Update Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;