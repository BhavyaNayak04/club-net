"use client";

import { useRouter } from "next/navigation"; // For navigation
import { Toaster, toast } from "sonner"; // Localized toast notification
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Form validation schema
const formSchema = z.object({
  semester: z.string().nonempty("Semester is required"),
  usn: z.string().nonempty("USN is required"),
  branch: z.string().nonempty("Branch is required"),
});

export default function Profile() {
  const router = useRouter(); // For redirection
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      // Show toast message for success
      toast.success("Details updated successfully!");

      // Simulate API or delay
      setTimeout(() => {
        // Redirect to profile page
        router.push("/profile"); // Update this path to your actual profile page route
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <Toaster /> {/* Display toast notifications only on this page */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          {/* Semester Field */}
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <Input placeholder="Enter semester" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* USN Field */}
          <FormField
            control={form.control}
            name="usn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter USN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch Field */}
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input placeholder="Enter branch" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
