import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Globe, Bell, Shield, Database, Users, Mail } from "lucide-react";

const AdminSettings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-myrobot-navy">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="My Robot Academy" />
              </div>
              
              <div>
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Enable to put site in maintenance mode</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>New User Registrations</Label>
                  <p className="text-sm text-gray-500">Notify when new users register</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Course Enrollments</Label>
                  <p className="text-sm text-gray-500">Notify when users enroll in courses</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payment Notifications</Label>
                  <p className="text-sm text-gray-500">Notify when payments are received</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add extra security to your account</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Logout</Label>
                  <p className="text-sm text-gray-500">Automatically logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Login Audit</Label>
                  <p className="text-sm text-gray-500">Track all login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Version</span>
                <Badge variant="outline">v1.0.0</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database Status</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Users</span>
                <span className="text-sm">247</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Courses</span>
                <span className="text-sm">12</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm">2.4 GB</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2 pt-2">
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Backup Database
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Export Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="btn-primary">Save All Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;