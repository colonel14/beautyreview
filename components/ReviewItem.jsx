"use client";
import React from "react";
import ReactStars from "react-rating-star-with-type";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ReviewItem = ({ id, rating, comment, userId, currentUser }) => {
  console.log(currentUser);

  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/review/${id}`);
      toast.success("Review deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something Went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <ReactStars
            value={rating}
            isEdit={true}
            activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC"]}
          />
          <p className="mt-2">{comment}</p>
        </div>
        {currentUser && currentUser.id === userId && (
          <Button
            variant="default"
            size="sm"
            className="bg-pink-dark"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
