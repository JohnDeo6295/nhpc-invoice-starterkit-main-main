import React from "react";
import ListingCategories, {
  ListingCategoriesProps,
} from "./components/listing-categories";
import { getCategories } from "@/actions/categories";

export default async function page() {
  const categories: ListingCategoriesProps[] = (await getCategories()) || [];
  return (
    <div className="">
      <ListingCategories categories={categories} />
    </div>
  );
}
