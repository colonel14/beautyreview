"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import useRecommendationModal from "@/hooks/useRecommendationModal";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";

const steps = {
  type: 0,
  categoris: 1,
  skinType: 2,
  recommendation: 3,
  topRated: 4,
};

export default function RecommendationModal({ categories }) {
  const [step, setStep] = useState(steps.type);
  const recommendationModal = useRecommendationModal();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("Makeup");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const searchParams = useSearchParams();

  const onClose = () => {
    setStep(steps.type);
    setRecommendedProducts([]);
    recommendationModal.onClose();
  };

  useEffect(() => {
    setFilteredCategories(categories.filter((item) => item.type === type));
  }, [type]);

  const form = useForm({
    defaultValues: {
      categories: [],
      skinType: "",
      wantsTopRated: "false",
    },
  });

  form.register("skinType", { required: "Skin type is required" });
  form.register("price", { required: "Price is required" });

  const onSubmit = async (data) => {
    setIsLoading(true);

    let formData = {};
    formData.selectedCategory = data?.categories.join(", ");
    formData.selectedType = searchParams?.type;
    formData.skinType = data?.skinType;
    formData.budget = data?.price;
    formData.wantsTopRated = data?.wantsTopRated;

    try {
      const response = await axios.post("/api/filters", formData);
      const products = response?.data?.products;
      let type = response.data.type;

      setRecommendedProducts(products);

      console.log(products);

      if (type == "recommendations") setStep(3);
      if (type == "topRated") setStep(4);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
      setIsLoading(false);
    }
  };

  const handleClickType = (type) => {
    setType(type);
    form.reset();
    setStep((value) => value + 1);
  };

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-start">
        <div className="text-2xl font-bold">
          Which type of product are you looking for?
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <button
          onClick={() => handleClickType("Makeup")}
          className="flex-1 border border-1 rounded-md font-bold text-pink py-7 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
        >
          Makup
        </button>
        <button
          onClick={() => handleClickType("Skincare")}
          className="flex-1 border border-1 rounded-md font-bold text-pink py-7 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
        >
          Skincare
        </button>
      </div>
    </div>
  );

  if (step == steps.categoris) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="text-start">
          <div className="text-2xl font-bold">
            What type of {searchParams?.type || "Makeup"} are you looking for?
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-5">
              {filteredCategories.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="categories"
                  className="col-span-6"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="col-span-6 flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <div className="flex gap-3 mt-10">
              <Button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep((value) => value + 1)}
                type="button"
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  if (step == steps.skinType) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="skinType"
                className
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      What is your Skin Type?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a Skin type"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Normal</SelectItem>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="Oily">Oily</SelectItem>
                        <SelectItem value="Combination">Combination</SelectItem>
                        <SelectItem value="Sensitive">Sensitive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      What is your budget?
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wantsTopRated"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-bold text-lg">
                      Would you recommed this product to ther other?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-5"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Not important
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 mt-10">
              <Button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  if (step == steps.recommendation) {
    bodyContent = (
      <div>
        <div className="grid grid-cols-12 gap-5 h-[60vh] overflow-y-auto">
          {recommendedProducts.length ? (
            <>
              {recommendedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="col-span-6"
                >
                  <div className="relative h-[300px] product__slide-img">
                    <Image
                      src={product?.images[0]?.url}
                      fill
                      alt="slide image"
                    />
                  </div>
                  <div className="product__slide-info">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="product__slide-title">
                          {product.title}
                        </h4>
                        <p className="product__slide-desc line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className="w-full">
              Sorry we didn&apos;t find any products with the same category As
              you sumbitted
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-10">
          <Button
            type="button"
            onClick={() => setStep((value) => value - 1)}
            className="flex-1"
          >
            Back
          </Button>
          {/* <Button
            onClick={() => setStep((value) => value + 1)}
            type="button"
            className="flex-1"
          >
            Close
          </Button> */}
        </div>
      </div>
    );
  }
  if (step == steps.topRated) {
    bodyContent = (
      <div className="w-full">
        <h3 className="text-pink-dark text-center font-bold mb-5">
          {" "}
          Sorry we didn&apos;t find any products with the same category As you
          sumbitted So recommended you some of the top Rated products
        </h3>
        <div className="grid grid-cols-12 gap-5 h-[60vh] overflow-y-auto">
          {recommendedProducts.length ? (
            <>
              {recommendedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="col-span-6"
                >
                  <div className="relative h-[300px] product__slide-img">
                    <Image
                      src={product?.images[0]?.url}
                      fill
                      alt="slide image"
                    />
                  </div>
                  <div className="product__slide-info">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="product__slide-title">
                          {product.title}
                        </h4>
                        <p className="product__slide-desc line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className="w-full">
              Sorry we didn&apos;t find any products with the same category As
              you sumbitted
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-10">
          <Button type="button" onClick={() => setStep(3)} className="flex-1">
            Back
          </Button>
          {/* <Button
            onClick={() => setStep((value) => value + 1)}
            type="button"
            className="flex-1"
          >
            Close
          </Button> */}
        </div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={recommendationModal.isOpen}
      onClose={onClose}
      title="Personal Suggestions"
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}
