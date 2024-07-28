"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Notes } from "@/type";
import { Card, CardContent } from "./ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface NotesCardProps {
  data: Notes;
  onDelete: (noteId: string) => void;
}

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

const NotesCard: React.FC<NotesCardProps> = ({ data, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ncategory: "",
      ntitle: "",
      ndescription: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!selectedNoteId) return;

    setLoading(true);
    try {
      await axios.patch(`/api/notes/${selectedNoteId}`, data);
      toast.success("Note updated successfully");
      setIsUpdateModalOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update note");
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const openDeleteModal = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsDeleteModalOpen(true);
  };

  const openUpdateModal = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedNoteId) {
      setLoading(true);
      try {
        await axios.delete(`/api/notes/${selectedNoteId}`);
        toast.success("Note deleted successfully");
        onDelete(selectedNoteId);
        setIsDeleteModalOpen(false);
      } catch (error) {
        toast.error("Failed to delete note");
        console.error("Error deleting note:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="w-[450px]">
      <CardContent>
        <div className="flex flex-row flex-wrap mt-3 justify-between">
          <div className="py-2 px-2 bg-blue-100 font-bold font-xl rounded-lg">
            {data.ncategory}
          </div>
          <div className="flex items-center">
            <Edit
              className={`w-6 h-6 ml-2 cursor-pointer ${
                loading ? "opacity-50" : ""
              }`}
              onClick={() => openUpdateModal(data.id.toString())}
            />
            <Trash2
              className={`w-6 h-6 ml-2 cursor-pointer ${
                loading ? "opacity-50" : ""
              }`}
              onClick={() => openDeleteModal(data.id.toString())}
            />
          </div>
        </div>

        <div className="mt-3">
          <h2 className="text-xl font-bold">{data.ntitle}</h2>
          <p className="text-sm text-gray-500">
            {formattedDate(data.createdAt)}
          </p>
          <p className="mt-2 text-base text-justify">{data.ndescription}</p>
        </div>
      </CardContent>

      {/* Dialog Update OnClick */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update your notes</DialogTitle>
            <DialogDescription>
              Fill the form below to update your notes
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
                    onClick={() => setIsUpdateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update notes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog Delete OnClick */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter className="mt-5 gap-3 xl:gap-0">
            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NotesCard;
