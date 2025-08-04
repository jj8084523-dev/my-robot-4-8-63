
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterFormValues } from "./RegisterSchema";

interface StudentInformationStepProps {
  control: Control<RegisterFormValues>;
}

const StudentInformationStep = ({ control }: StudentInformationStepProps) => {
  return (
    <>
      <FormField
        control={control}
        name="studentName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Student Name</FormLabel>
            <FormControl>
              <Input placeholder="Student Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="studentAge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Student Age</FormLabel>
            <FormControl>
              <Input placeholder="Age between 7-16" type="number" min="7" max="16" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="interestArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interest Area</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary interest" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="robotics">Robotics</SelectItem>
                <SelectItem value="arduino">Arduino</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="courseLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select course level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default StudentInformationStep;
