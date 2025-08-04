
import { useState } from "react";
import { format } from "date-fns";
import { Check, ChevronDown, Filter, Search } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock payment data
const mockPayments = [
  {
    id: "1",
    studentName: "Alex Johnson",
    parentName: "Michelle Johnson",
    email: "michelle@example.com",
    amount: 250,
    course: "Robotics 101",
    date: "2023-09-15T10:30:00",
    status: "Succeeded",
    method: "Credit Card",
    transactionId: "ch_3NWuZtKl2sJ8nG1A0XtUeVlK",
  },
  {
    id: "2",
    studentName: "Emma Williams",
    parentName: "David Williams",
    email: "david@example.com",
    amount: 180,
    course: "Arduino Electronics",
    date: "2023-09-10T14:45:00",
    status: "Pending",
    method: "Bank Transfer",
    transactionId: "tr_5LKu8tXj3nP2mV7B",
  },
  {
    id: "3",
    studentName: "Ryan Davis",
    parentName: "Sarah Davis",
    email: "sarah@example.com",
    amount: 300,
    course: "Advanced Robotics",
    date: "2023-09-05T09:15:00",
    status: "Failed",
    method: "Credit Card",
    transactionId: "ch_7ZXcY2Pl4bM3vN8S",
  },
  {
    id: "4",
    studentName: "Sophie Miller",
    parentName: "James Miller",
    email: "james@example.com",
    amount: 200,
    course: "Programming for Kids",
    date: "2023-08-28T11:00:00",
    status: "Succeeded",
    method: "PayPal",
    transactionId: "PAYID-LMQZC6Y1U169724NP8870021",
  },
  {
    id: "5",
    studentName: "Lucas Brown",
    parentName: "Jennifer Brown",
    email: "jennifer@example.com",
    amount: 250,
    course: "Math for Engineers",
    date: "2023-08-20T13:20:00",
    status: "Refunded",
    method: "Credit Card",
    transactionId: "ch_9TRfG4Qs2aL7jK3D",
  },
  {
    id: "6",
    studentName: "Olivia Taylor",
    parentName: "Robert Taylor",
    email: "robert@example.com",
    amount: 250,
    course: "Robotics 101",
    date: "2023-09-18T15:30:00",
    status: "Succeeded",
    method: "Credit Card",
    transactionId: "ch_6MnB1pT8vQ4lK5sR",
  },
];

const AdminPayments = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Succeeded":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get unique courses for the filter
  const uniqueCourses = Array.from(new Set(payments.map(p => p.course)));

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesCourse = courseFilter === "all" || payment.course === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Calculate statistics
  const totalRevenue = filteredPayments
    .filter(p => p.status === "Succeeded")
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const pendingRevenue = filteredPayments
    .filter(p => p.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const refundedAmount = filteredPayments
    .filter(p => p.status === "Refunded")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const updatePaymentStatus = (id: string, newStatus: string) => {
    const updatedPayments = payments.map(payment => 
      payment.id === id ? { ...payment, status: newStatus } : payment
    );
    
    setPayments(updatedPayments);
    toast.success(`Payment status updated to ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-myrobot-navy">Payment Management</h1>
          
          <Button className="btn-primary">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Add Manual Payment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-green-600">
                      <svg className="w-3 h-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      12% compared to last month
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <h4 className="text-lg font-semibold">${pendingRevenue.toFixed(2)}</h4>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Refunded</p>
                    <h4 className="text-lg font-semibold">${refundedAmount.toFixed(2)}</h4>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Filters</p>
                  <div className="space-y-3 mt-2">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Succeeded">Succeeded</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                          <SelectItem value="Refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Course</label>
                      <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          {uniqueCourses.map((course) => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-2" 
                      onClick={() => {
                        setStatusFilter("all");
                        setCourseFilter("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    placeholder="Search by name, email, or transaction ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No payments found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{payment.studentName}</div>
                              <div className="text-xs text-gray-500">{payment.parentName}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">${payment.amount}</TableCell>
                          <TableCell>{payment.course}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {format(new Date(payment.date), "MMM d, yyyy")}
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(payment.date), "h:mm a")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                  <ChevronDown size={14} className="ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "Succeeded")}>
                                  <Check size={14} className="mr-2 text-green-600" />
                                  Mark as Succeeded
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "Pending")}>
                                  <svg className="w-3.5 h-3.5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Mark as Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "Failed")}>
                                  <svg className="w-3.5 h-3.5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Mark as Failed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "Refunded")}>
                                  <svg className="w-3.5 h-3.5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                  </svg>
                                  Process Refund
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <svg className="w-3.5 h-3.5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  View Receipt
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <svg className="w-3.5 h-3.5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Email Receipt
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Showing {filteredPayments.length} of {payments.length} payments
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPayments;
