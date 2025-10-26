import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  schoolEmail: z.string().email("Please enter a valid email address"),
  jobTitle: z.string().min(2, "Job title is required"),
  schoolName: z.string().min(2, "School name is required"),
  enrollmentSize: z.string().min(1, "Please select enrollment size"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  phoneNo: z.string().min(10, "Please enter a valid phone number"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
});

type FormData = z.infer<typeof formSchema>;

const RequestDemo = () => {
  const { toast } = useToast();
  const [interests, setInterests] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      lastName: "",
      schoolEmail: "",
      jobTitle: "",
      schoolName: "",
      enrollmentSize: "",
      city: "",
      state: "",
      phoneNo: "",
      interests: [],
    },
  });

  const handleInterestChange = (interest: string, checked: boolean) => {
    let newInterests: string[];
    if (checked) {
      newInterests = [...interests, interest];
    } else {
      newInterests = interests.filter((item) => item !== interest);
    }
    setInterests(newInterests);
    form.setValue("interests", newInterests);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Demo Request Submitted!",
      description: "We'll contact you soon to schedule your personalized demo.",
    });
  };

  const interestOptions = [
    "Admission and Enrollment",
    "Financial Aid",
    "Tuition Management",
    "Student Information System",
    "Complete Suite",
  ];

  const enrollmentSizes = [
    "Under 100 students",
    "100-500 students",
    "500-1,000 students",
    "1,000-5,000 students",
    "5,000+ students",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Request a Demo
            </h1>
            <p className="text-xl text-purple-100 mb-4">
              Build a Software Package That Fits Your School
            </p>
            <p className="text-lg text-purple-200">
              Discover how our comprehensive school management system can transform your educational institution
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Last Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schoolEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">School Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your school email"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Job Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your job title"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schoolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">School Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your school name"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enrollmentSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">School Enrollment Size *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="Select enrollment size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {enrollmentSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">City *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your city"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">State *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your state"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-white">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-8">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-white text-lg mb-4 block">
                          What are you most interested in? *
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {interestOptions.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={interests.includes(interest)}
                                onCheckedChange={(checked) =>
                                  handleInterestChange(interest, checked as boolean)
                                }
                                className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                              />
                              <label
                                htmlFor={interest}
                                className="text-white cursor-pointer"
                              >
                                {interest}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center pt-8">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="px-12 py-4 text-lg"
                  >
                    Request Demo
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestDemo;