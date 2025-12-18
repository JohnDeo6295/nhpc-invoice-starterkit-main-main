"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/actions/categories";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryForm({
  id,
  mode = "create",
  category,
  onSuccess,
}: {
  id?: string;
  mode?: "create" | "edit";
  category?: { id: string; name: string; slug: string };
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (mode === "edit" && category && open) {
      setValue("name", category.name);
    }
  }, [mode, category, open, setValue]);

  const handleFormSubmit = async (data: CategoryFormData) => {
    try {
      const slug = data.name.trim().toLowerCase().split(" ").join("-");
      const payload = {
        name: data.name,
        slug: slug,
      };

      const url =
        mode === "edit" && category
          ? `${API_URL}/categories/${category.id}`
          : `${API_URL}/categories`;

      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);

      if (mode === "edit") {
        if (res.ok) {
          toast.success("Category successfully updated");
          onSuccess?.();
        } else {
          toast.error("Failed to update category");
        }
      } else {
        if (result.success) {
          toast.success("Category successfully created");
          onSuccess?.();
        } else if (result.status === 409) {
          toast.error("Category already exists");
        } else {
          toast.error("Failed to create category");
        }
      }
    } catch (error) {
      toast.error(
        `Failed to ${mode === "edit" ? "update" : "create"} category`
      );
      console.log(error);
    }

    reset();
    setOpen(false);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        ) : (
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update the category information. Click save when you're done."
              : "Create a new product category. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g., Electronics, Clothing, Books"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
