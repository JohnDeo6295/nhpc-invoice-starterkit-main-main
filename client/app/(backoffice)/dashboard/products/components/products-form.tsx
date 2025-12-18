// "use client";
// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { ScrollArea } from "@/components/ui/scroll-area";

// import { Star, Package, Tag, DollarSign, Image, Plus, X } from "lucide-react";

// // Zod schema for product validation
// const productSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Product name is required")
//     .max(100, "Name must be less than 100 characters"),
//   price: z.number().min(0.01, "Price must be greater than 0"),

//   image: z.string().url("Please enter a valid image URL"),
//   category: z.string().min(1, "Please select a category"),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// interface Product {
//   id: string;
//   slug: string;
//   name: string;
//   price: number;

//   image: string;
//   category: string;
// }

// const categories: string[] = [
//   "Accessories",
//   "Clothing",
//   "Electronics",
//   "Home & Garden",
//   "Sports & Outdoors",
//   "Beauty & Personal Care",
//   "Books & Media",
//   "Toys & Games",
// ];

// export default function ProductForm() {
//   const [open, setOpen] = useState(false);

//   const form = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: "",
//       price: 0,

//       image: "",
//       category: "",
//     },
//   });

//   const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
//     const slug = data.name.trim().toLowerCase().split(" ").join("-");
//     const product = {
//       name: data.name,
//       price: data.price,

//       image: data.image,
//       category: data.category,
//     };

//     console.log(product);
//     alert("Product created successfully! Check the console for details.");
//     setOpen(false);
//     form.reset();
//   };

//   const onCancel = (): void => {
//     form.reset();
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
//           <Plus className="h-4 w-4 mr-2" />
//           Add New Product
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-2xl max-h-[90vh] p-0">
//         <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <DialogTitle className="flex items-center gap-2 text-xl">
//                 <Package className="h-5 w-5" />
//                 Create New Product
//               </DialogTitle>
//               <DialogDescription className="text-blue-100 mt-1">
//                 Fill in the details below to create your product listing
//               </DialogDescription>
//             </div>
//           </div>
//         </DialogHeader>

//         <ScrollArea className="max-h-[calc(90vh-140px)]">
//           <div className="p-6">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4"
//               >
//                 {/* Product Name */}
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 font-semibold">
//                         Product Name *
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter product name..."
//                           className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Pricing Section */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
//                           <DollarSign className="h-4 w-4" />
//                           Price *
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             placeholder="0.00"
//                             className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                             {...field}
//                             onChange={(e) =>
//                               field.onChange(parseFloat(e.target.value) || 0)
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                 {/* Image URL */}
//                 <FormField
//                   control={form.control}
//                   name="image"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
//                         <Image className="h-4 w-4" />
//                         Image URL *
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="https://example.com/image.jpg"
//                           className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Category and Rating */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="category"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700 font-semibold">
//                           Category *
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
//                               <SelectValue placeholder="Select category" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {categories.map((category) => (
//                               <SelectItem key={category} value={category}>
//                                 {category}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                 <div className="flex gap-3 pt-4 border-t">
//                   <Button
//                     type="submit"
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
//                   >
//                     Create Product
//                   </Button>

//                   <Button
//                     type="button"
//                     onClick={onCancel}
//                     variant="outline"
//                     className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }
import React from "react";

export default function ProductForm() {
  return (
    <div>
      <h2>ds</h2>
    </div>
  );
}
