import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-center gap-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <Link
          href="/dashboard/categories"
          className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Categories
        </Link>

        <Link
          href="/dashboard/products"
          className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Products
        </Link>
      </div>

      {children}
    </div>
  );
}
