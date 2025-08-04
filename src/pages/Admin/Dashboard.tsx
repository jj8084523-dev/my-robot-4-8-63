
import { Users, Calendar, ArrowUp, ArrowDown, Settings } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for charts
const registrationData = [
  { month: "Jan", count: 35 },
  { month: "Feb", count: 48 },
  { month: "Mar", count: 42 },
  { month: "Apr", count: 53 },
  { month: "May", count: 60 },
  { month: "Jun", count: 70 },
  { month: "Jul", count: 65 },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-myrobot-navy">Dashboard Overview</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Registrations"
            value="426"
            icon={<Users size={20} />}
            description="This month"
            trend={{ value: 12, positive: true }}
          />
          <DashboardCard
            title="Active Courses"
            value="18"
            icon={<Calendar size={20} />}
            description="Running now"
          />
          <DashboardCard
            title="Pending Approvals"
            value="8"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            description="Requires action"
          />
          <DashboardCard
            title="Revenue"
            value="$24,380"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            description="Monthly"
            trend={{ value: 8, positive: true }}
          />
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registration Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Trend</CardTitle>
              <CardDescription>Monthly registration count for the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={registrationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#FF8C42" barSize={30} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="bg-blue-100 p-2 rounded-full">
                    <Users size={16} className="text-blue-700" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New Registration: Ahmed Omar</p>
                    <p className="text-xs text-gray-500">Signed up for Robotics 101</p>
                    <p className="text-xs text-gray-400">20 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="bg-green-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Payment Received: $250</p>
                    <p className="text-xs text-gray-500">From David Brown for Arduino Advanced</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="bg-amber-100 p-2 rounded-full">
                    <Calendar size={16} className="text-amber-700" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Course Started: Programming Basics</p>
                    <p className="text-xs text-gray-500">10 students enrolled</p>
                    <p className="text-xs text-gray-400">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="bg-purple-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Document Updated: Summer Camp Schedule</p>
                    <p className="text-xs text-gray-500">By Admin Sarah</p>
                    <p className="text-xs text-gray-400">2 days ago</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button variant="ghost" size="sm" className="text-myrobot-orange">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="btn-primary h-auto py-6 flex flex-col items-center" onClick={() => window.location.href = '/admin/users'}>
            <Users className="h-6 w-6 mb-2" />
            <span>Manage Users</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-myrobot-orange text-myrobot-orange hover:bg-myrobot-orange/10" onClick={() => window.location.href = '/admin/courses'}>
            <Calendar className="h-6 w-6 mb-2" />
            <span>Manage Courses</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-myrobot-navy text-myrobot-navy hover:bg-myrobot-navy/10" onClick={() => window.location.href = '/admin/gallery'}>
            <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Manage Gallery</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center" onClick={() => window.location.href = '/admin/achievements'}>
            <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span>Manage Achievements</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
