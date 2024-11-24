"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/components/constants";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Club {
  shortcut: any;
  clubId: string;
  clubName: string;
  description: string;
  category: string;
  logo: string;
  followers: { length: number };
  url: string;
}
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DashboardEle from "@/components/DashboardEle";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [clubs, setClubs] = useState<Club[]>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ename: "",
      description: "",
      banner: "",
      club: "",
      entryFee: 0,
      teamMates: 1,
      location: "",
      contact: "",
      dateTime: "",
    },
  });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/clubs");
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const eventData = {
      eventName: values.ename,
      description: values.description,
      banner: values.banner,
      dateAndTime: values.dateTime,
      location: values.location,
      entryFee: values.entryFee,
      teamCapacity: values.teamMates,
      organizerContactNumber: values.contact,
    };

    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log("Event added:", data);
      toast.success("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <section className="content-container space-y-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardEle />
      <h1 className="text-3xl font-bold">Create Event</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-8 md:grid-cols-3 w-full"
        >
          <FormField
            control={form.control}
            name="ename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Event Name" {...field} />
                </FormControl>
                <FormDescription>Enter the event name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>Enter the event description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Banner URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/banner.jpg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the URL of the event banner
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="club"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {field.value
                          ? clubs?.find(
                              (club) => club.clubId.toString() === field.value
                            )?.clubName
                          : "Select club..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search club..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No club found.</CommandEmpty>
                          <CommandGroup>
                            {clubs?.map((club) => (
                              <CommandItem
                                key={club.clubId}
                                value={club.clubId.toString()}
                                onSelect={(currentValue) => {
                                  field.onChange(currentValue);
                                  setOpen(false);
                                }}
                              >
                                {club.clubName}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === club.clubId.toString()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  Select the club organizing the event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entry Fee</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Entry Fee"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Enter the entry fee for the event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamMates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Team Mates</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Number of Team Mates"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Enter the number of team mates allowed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormDescription>Enter the event location</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizer Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Contact Number" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the organizer's contact number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date and Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormDescription>
                  Select the date and time of the event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      <ToastContainer />
    </section>
  );
}
