"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../_components/_Columns";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
});

const SubCategories = ({ subcategories, parentId }) => {
  const router = useRouter();

  const formattedCategories = subcategories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    data.parentId = parentId;
    data.catType = "Skincare";

    try {
      await axios.post("/api/category", data);
      toast.success("Category created.");
      router.refresh();
      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sub Categories</h2>
      </div>
      <Separator />
      <div className="mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex items-end gap-8 max-w-3xl">
              <div className="flex-1">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Category Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} className="ml-auto" type="submit">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="mt-10">
        <DataTable
          searchKey="name"
          columns={columns}
          data={formattedCategories}
        />
      </div>
    </div>
  );
};

export default SubCategories;
