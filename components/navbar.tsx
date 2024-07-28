"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import InputSearch from "./InputSearch";
import NoteContainer from "./note-container";

const formSchema = z.object({
  ncategory: z
    .string()
    .min(1, { message: "Note category is required" })
    .max(255, { message: "Note category is too long" }),
  ntitle: z
    .string()
    .min(1, { message: "Note title is required" })
    .max(255, { message: "Note title is too long" }),
  ndescription: z
    .string()
    .min(1, { message: "Note description is required" })
    .max(255, { message: "Note description is too long" }),
});

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ncategory: "",
      ntitle: "",
      ndescription: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/notes", { ...data });
      toast.success("Notes created successfully");
      window.location.reload();
      form.reset();
    } catch (error) {
      toast.error("Failed to create notes");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleCancel = () => {
    form.reset({
      ncategory: "",
      ntitle: "",
      ndescription: "",
    });
    toast.error("Notes create canceled");
  };

  return (
    <>
      <nav className="sticky top-0 left-0 w-full flex items-center justify-between px-4 lg:px-10 3xl:px-0 py-3 bg-blue-300 z-30 border-b-2 border-indigo-50 gap-2">
        <Link href="/" className="flex flex-col lg:flex-row items-center">
          <Image src="/assets/notebook.png" alt="logo" width={30} height={20} />
          <span className="font-bold text-sm xl:text-2xl ml-0 lg:ml-2 text-white">
            Notebooks
          </span>
        </Link>

        <InputSearch onSearch={handleSearch} />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-950 rounded-lg lg:rounded-full">
              <Plus className="text-white w-4 h-4 lg:mr-4 items-center justify-center" />
              <span className="hidden lg:inline">Add Note</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create your notes</DialogTitle>
              <DialogDescription>
                Fill the form below to create your notes
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                <FormField
                  control={form.control}
                  name="ncategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note Category</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your note category"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ntitle"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Note Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your note title"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ndescription"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Note Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your note description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-10 gap-3 xl:gap-0">
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create notes"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </nav>
      <NoteContainer searchKeyword={searchKeyword} />
    </>
  );
};

export default Navbar;
