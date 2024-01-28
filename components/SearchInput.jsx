"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import useLoginModal from "@/hooks/useLoginModal";

function SearchInput({ currentUser }) {
  const loginModal = useLoginModal();

  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("search", value);
    replace(`/search?${params.toString()}`);
  };

  const handleClick = () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    replace("/product/new");
  };

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 my-6 mb-12">
      <form
        onSubmit={submitSearch}
        className="w-[800px] max-w-full flex items-center gap-4"
      >
        <Input
          className="py-5 border-pink-500 text-pink-dark border-[2px] focus-visible:ring-0 focus-visible:ring-none"
          placeholder="Search..."
          onChange={onChange}
          value={value}
        />
        <Button className="bg-pink-dark">Search</Button>
      </form>
      <Button
        onClick={handleClick}
        className="flex items-center gap-2 bg-white border border-pink-dark text-pink-dark font-medium hover:bg-pink-dark hover:text-white"
      >
        Add Product <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default SearchInput;
