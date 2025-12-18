import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
// import db from "./lib/db.js";
import prisma from "./lib/db.js";
import type { CategoryCreateInput } from "./generated/prisma/models.js";
// import type { PrismaClient } from "./generated/prisma/client.js";

// type ContextWithPrisma = {
//   Variables: {
//     prisma: PrismaClient;
//   };
// };

const app = new Hono();
// const app = new Hono<ContextWithPrisma>();

app.use("/*", cors());
app.get("/", (c) => {
  return c.json({
    message: "Hello World",
  });
});
app.get("/categories", async (c) => {
  const categories = await prisma.category.findMany({
   select: {
      id: true,
      name: true,
      slug: true,
      _count: { select: { products: true }   },
    }, 
  });
  const result = categories.map((c)=>{
 return{   id:c.id,
    name:c.name,
    slug:c.slug,
    products:c._count.products}
  })
  return c.json(result, 200);
});
app.get("/categories/:id", async (c) => {
  const id = c.req.param("id");
  const categories = await prisma.category.findMany({
    where: { id },
   select: {
     
      name: true,
     
    }, 
  });

  return c.json(categories, 200);
});
app.post("/categories", async (c) => {
  const data: CategoryCreateInput = await c.req.json();

  const existingCategory = await prisma.category.findUnique({
    where: { slug: data.slug },
  });

  if (existingCategory) {
    return c.json(
      { message: "Category already exists" },
      409 // Bad Request
    );
  }

  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
    },
  });

  return c.json({ data: newCategory, success: true }, 201); // Created
});

app.patch("/categories/:id", async (c) => {
  const id = c.req.param("id");
  const data = await c.req.json();

  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    return c.json(
      { message: "Category not found" },
      404
    );
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data,
  });

  return c.json(updatedCategory, 200);
});

app.delete("/categories/:id", async (c) => {
  const id = c.req.param("id");

  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    return c.json(
      { message: "Category not found" },
      404
    );
  }

  await prisma.category.delete({
    where: { id },
  });

  return c.json(
    { message: "Category deleted successfully" },
    200
  );
});



serve(
  {
    fetch: app.fetch,
    port: 8787,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
