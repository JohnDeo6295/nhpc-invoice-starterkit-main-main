import type { ListingCategoriesProps } from "@/app/(backoffice)/dashboard/categories/components/listing-categories"

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787"
export async function getCategories(): Promise<ListingCategoriesProps[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      cache: "no-store",
    })

    const data = await res.json()
    return data as ListingCategoriesProps[]
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function updateCategory(
  id: string,
  data: Partial<Omit<ListingCategoriesProps, "id">>,
): Promise<ListingCategoriesProps | null> {
  try {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error("Failed to update category")
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      throw new Error("Failed to delete category")
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
