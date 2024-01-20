"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
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

  return (
    <div className="flex max-w-2xl mx-auto my-6 mb-12">
      <form onSubmit={submitSearch} className="w-full">
        <Input
          className="py-5 border-pink-500 text-pink-dark border-[2px] focus-visible:ring-0 focus-visible:ring-none"
          placeholder="Search..."
          onChange={onChange}
          value={value}
        />
      </form>
    </div>
  );
}

export default SearchInput;
