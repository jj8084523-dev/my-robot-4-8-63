
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // For demo purposes only
    console.log("Reset password for:", values.email);
    
    // Show success message
    toast.success("Password reset link sent to your email!");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container max-w-md mx-auto py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Check Your Email</CardTitle>
              <CardDescription className="text-center">
                We've sent a password reset link to your email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">
                If you don't see the email in your inbox, please check your spam folder.
              </p>
              <p className="text-sm text-gray-500">
                Didn't receive an email? You can request a new link in{" "}
                <span className="text-myrobot-orange font-medium">5 minutes</span>.
              </p>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Link to="/auth/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <SectionHeading 
          title="Forgot Password" 
          subtitle="Enter your email address to reset your password" 
          centered
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Password Reset</CardTitle>
            <CardDescription className="text-center">
              Enter your email and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="btn-primary w-full">
                  Send Reset Link
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/auth/login" className="text-sm text-myrobot-orange hover:underline">
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
