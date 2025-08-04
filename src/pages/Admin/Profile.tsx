import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Phone, Calendar, Shield } from "lucide-react";

const AdminProfile = () => {
  const { user } = useAuth();

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
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                  <AvatarFallback className="text-2xl">AD</AvatarFallback>
                </Avatar>
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