
import { Control, UseFormWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterFormValues } from "./RegisterSchema";

interface ConfirmationStepProps {
  control: Control<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
}

const ConfirmationStep = ({ control, watch }: ConfirmationStepProps) => {
  return (
    <>
      <div className="bg-myrobot-white/50 p-4 rounded-md border border-gray-200">
        <h3 className="font-medium text-myrobot-navy mb-2">Parent Information</h3>
        <p>Name: {watch("parentFullName")}</p>
        <p>Email: {watch("parentEmail")}</p>
        <p>Phone: {watch("parentPhone")}</p>

        <h3 className="font-medium text-myrobot-navy mt-4 mb-2">Student Information</h3>
        <p>Name: {watch("studentName")}</p>
        <p>Age: {watch("studentAge")}</p>
        <p>Interest: {watch("interestArea")}</p>
        <p>Level: {watch("courseLevel")}</p>
      </div>

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I agree to the terms and conditions
              </FormLabel>
              <p className="text-xs text-muted-foreground">
                By checking this box, you agree to our{" "}
                <Link to="/terms" className="text-myrobot-orange hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-myrobot-orange hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ConfirmationStep;
