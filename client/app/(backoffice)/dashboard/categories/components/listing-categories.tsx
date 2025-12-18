"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { CategoryForm } from "./category-form";
import { deleteCategory } from "@/actions/categories";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ListingCategoriesProps = {
  id: string;
  name: string;
  products: number;
  slug: string;
};

export default function ListingCategories({
  categories,
}: {
  categories: ListingCategoriesProps[];
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleView = (id: string) => {
    // Handle view action
    console.log("View category with id:", id);
  };

  const handleDeleteConfirm = async (id: string) => {
    if (!id) return;

    setIsDeleting(true);
    try {
      const success = await deleteCategory(id);

      if (success) {
        toast.success("Category deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the category");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSuccess = () => {
    router.refresh();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-4xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <h2>Categories</h2>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <CategoryForm onSuccess={handleEditSuccess} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Category Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Products
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 flex items-center justify-center"
                  >
                    <span className="">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {category.name}
                      </th>
                      <td className="px-4 py-3">{category.products}</td>

                      <td className="px-4 py-3 flex items-center justify-center">
                        <CategoryForm
                          mode="edit"
                          category={category}
                          onSuccess={handleEditSuccess}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(category.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleDeleteConfirm(category.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
