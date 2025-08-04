
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const RegisterSuccess = () => {
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-myrobot-navy mb-4">Registration Successful!</h1>
          
          <p className="mb-6 text-gray-600">
            Thank you for registering with My Robot. We're excited to have you join our community of young innovators!
          </p>
          
          <div className="bg-myrobot-white/50 p-4 rounded-md border border-gray-200 mb-6 text-left">
            <h3 className="font-medium text-myrobot-navy mb-2">Next Steps:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Check your email for confirmation details</li>
              <li>Complete your student profile</li>
              <li>Explore available courses</li>
              <li>Join our upcoming events</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link to="/parent/dashboard">
              <Button className="btn-primary w-full">Go to Dashboard</Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" className="w-full">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterSuccess;
