
import { useState } from "react";
import { format } from "date-fns";
import { Check, ChevronDown, Filter, Mail, Search, X } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock user data
const mockUsers = [
  {
    id: "1",
    studentName: "Alex Johnson",
    parentName: "Michelle Johnson",
    email: "michelle@example.com",
    phone: "+1 555-123-4567",
    age: 9,
    program: "Robotics 101",
    level: "Beginner",
    status: "Active",
    paymentStatus: "Paid",
    registrationDate: "2023-08-15T10:30:00",
  },
  {
    id: "2",
    studentName: "Emma Williams",
    parentName: "David Williams",
    email: "david@example.com",
    phone: "+1 555-234-5678",
    age: 11,
    program: "Arduino Electronics",
    level: "Intermediate",
    status: "Active",
    paymentStatus: "Partially Paid",
    registrationDate: "2023-09-02T14:45:00",
  },
  {
    id: "3",
    studentName: "Ryan Davis",
    parentName: "Sarah Davis",
    email: "sarah@example.com",
    phone: "+1 555-345-6789",
    age: 14,
    program: "Advanced Robotics",
    level: "Advanced",
    status: "Pending",
    paymentStatus: "Unpaid",
    registrationDate: "2023-09-10T09:15:00",
  },
  {
    id: "4",
    studentName: "Sophie Miller",
    parentName: "James Miller",
    email: "james@example.com",
    phone: "+1 555-456-7890",
    age: 8,
    program: "Programming for Kids",
    level: "Beginner",
    status: "Active",
    paymentStatus: "Paid",
    registrationDate: "2023-08-28T11:00:00",
  },
  {
    id: "5",
    studentName: "Lucas Brown",
    parentName: "Jennifer Brown",
    email: "jennifer@example.com",
    phone: "+1 555-567-8901",
    age: 12,
    program: "Math for Engineers",
    level: "Intermediate",
    status: "Inactive",
    paymentStatus: "Refunded",
    registrationDate: "2023-07-20T13:20:00",
  },
  {
    id: "6",
    studentName: "Olivia Taylor",
    parentName: "Robert Taylor",
    email: "robert@example.com",
    phone: "+1 555-678-9012",
    age: 10,
    program: "Robotics 101",
    level: "Beginner",
    status: "Pending",
    paymentStatus: "Unpaid",
    registrationDate: "2023-09-15T15:30:00",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    
    toast.success(`User status updated to ${newStatus}`);
  };

  const handlePaymentUpdate = (id: string, newStatus: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, paymentStatus: newStatus } : user
    );
    setUsers(updatedUsers);
    
    toast.success(`Payment status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Partially Paid":
        return "bg-blue-100 text-blue-800";
      case "Unpaid":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Apply filters to users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    const matchesPayment = paymentFilter === "all" || user.paymentStatus === paymentFilter;
    
    const matchesAge = 
      ageFilter === "all" ||
      (ageFilter === "7-9" && user.age >= 7 && user.age <= 9) ||
      (ageFilter === "10-12" && user.age >= 10 && user.age <= 12) ||
      (ageFilter === "13-16" && user.age >= 13 && user.age <= 16);
    
    const matchesProgram = programFilter === "all" || user.program === programFilter;

    return matchesSearch && matchesStatus && matchesAge && matchesProgram && matchesPayment;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-myrobot-navy">User Management</h1>
          
          <Button className="btn-primary">
            Generate Report
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <TabsList className="mb-4 md:mb-0 bg-myrobot-white/50">
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={18} />
                        Filters
                        <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60 p-4 space-y-3">
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Age Group</label>
                        <Select value={ageFilter} onValueChange={setAgeFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by age" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Ages</SelectItem>
                            <SelectItem value="7-9">7-9 years</SelectItem>
                            <SelectItem value="10-12">10-12 years</SelectItem>
                            <SelectItem value="13-16">13-16 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Program</label>
                        <Select value={programFilter} onValueChange={setProgramFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Programs</SelectItem>
                            <SelectItem value="Robotics 101">Robotics 101</SelectItem>
                            <SelectItem value="Arduino Electronics">Arduino Electronics</SelectItem>
                            <SelectItem value="Programming for Kids">Programming for Kids</SelectItem>
                            <SelectItem value="Math for Engineers">Math for Engineers</SelectItem>
                            <SelectItem value="Advanced Robotics">Advanced Robotics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Payment Status</label>
                        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by payment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Payments</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                            <SelectItem value="Refunded">Refunded</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          setStatusFilter("all");
                          setAgeFilter("all");
                          setProgramFilter("all");
                          setPaymentFilter("all");
                        }}
                      >
                        Reset Filters
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-6">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium">No users found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg bg-white p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-myrobot-orange text-white">
                              {getInitials(user.studentName)}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{user.studentName}</h3>
                              <Badge variant="outline" className={getLevelColor(user.level)}>
                                {user.level}
                              </Badge>
                              <Badge variant="outline" className="bg-myrobot-orange/10 text-myrobot-orange border-myrobot-orange/20">
                                {user.age} years
                              </Badge>
                            </div>
                            
                            <div className="text-sm text-gray-500 mt-1">
                              Parent: {user.parentName}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              <div className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{user.email}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{user.phone}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span>{user.program}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Registered: {format(new Date(user.registrationDate), "MMM d, yyyy")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:items-end gap-2 md:min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Status:</span>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ChevronDown size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(user.id, "Active")}>
                                  <Check size={14} className="mr-2 text-green-600" />
                                  Set Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(user.id, "Pending")}>
                                  <svg className="w-3.5 h-3.5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Set Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(user.id, "Inactive")}>
                                  <X size={14} className="mr-2 text-gray-600" />
                                  Set Inactive
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Payment:</span>
                            <Badge className={getPaymentStatusColor(user.paymentStatus)}>
                              {user.paymentStatus}
                            </Badge>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ChevronDown size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handlePaymentUpdate(user.id, "Paid")}>
                                  <Check size={14} className="mr-2 text-green-600" />
                                  Mark as Paid
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handlePaymentUpdate(user.id, "Partially Paid")}>
                                  <svg className="w-3.5 h-3.5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Partially Paid
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handlePaymentUpdate(user.id, "Unpaid")}>
                                  <X size={14} className="mr-2 text-red-600" />
                                  Mark as Unpaid
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handlePaymentUpdate(user.id, "Refunded")}>
                                  <svg className="w-3.5 h-3.5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                  </svg>
                                  Mark as Refunded
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Mail size={16} />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
