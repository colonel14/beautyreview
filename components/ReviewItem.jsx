"use client";
import React from "react";
import ReactStars from "react-rating-star-with-type";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const ReviewItem = ({
  id,
  overallSatisfaction,
  reasonablyPriced,
  qualityRating,
  effectivenessRating,
  packagingRating,
  skinMatchRating,
  recommendToOthers,
  comment,
  User,
  userId,
  currentUser,
}) => {
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
        <div className="flex-1 flex items-start">
          <div className="flex-1 flex gap-4 items-center">
            <Avatar>
              <AvatarImage src={User?.image || "/images/placeholder.jpg"} />
            </Avatar>
            <div>
              <h5 className="font-bold">{User.name}</h5>
              <p className="">{comment}</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 font-bold">
              Overall Satisfaction:
              <ReactStars
                value={overallSatisfaction}
                isEdit={false}
                activeColors={["red", "orange", "orange", "#FFCE00"]}
              />
            </div>
            <div className="flex items-center gap-2 font-bold">
              Reasonably Priced:
              <ReactStars
                value={reasonablyPriced}
                isEdit={false}
                activeColors={["red", "orange", "orange", "#FFCE00"]}
              />
            </div>
            <div className="flex items-center gap-2 font-bold">
              Quality:
              <ReactStars
                value={qualityRating}
                isEdit={false}
                activeColors={["red", "orange", "orange", "#FFCE00"]}
              />
            </div>
            <div className="flex items-center gap-2 font-bold">
              Effectiveness:
              <ReactStars
                value={effectivenessRating}
                isEdit={false}
                activeColors={["red", "orange", "orange", "#FFCE00"]}
              />
            </div>
            <div className="flex items-center gap-2 font-bold">
              Packaging:
              <ReactStars
                value={packagingRating}
                isEdit={false}
                activeColors={["red", "orange", "orange", "#FFCE00"]}
              />
            </div>
            <div className="flex items-center gap-2 font-bold">
              Would Recommend:
              <span className="font-normal">
                {recommendToOthers == "true" ? "Yes" : "No"}
              </span>
            </div>
          </div>
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
