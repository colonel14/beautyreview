"use client";
import React from "react";
import ReactStars from "react-rating-star-with-type";

import { ThumbsDown, ThumbsUp, Trash } from "lucide-react";

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
  likes,
}) => {
  const router = useRouter();

  // Delete Comment
  const onDelete = async () => {
    try {
      await axios.delete(`/api/review/${id}`);
      toast.success("Review deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something Went wrong");
    }
  };

  // Add Like to the comment
  const addLike = async () => {
    if (!id) {
      toast.error("Invalid Review");
      return;
    }

    let data = {};
    data.userId = userId;
    data.reviewId = id;
    data.type = "like";

    try {
      await axios.post(`/api/like`, data);
      toast.success("Successfull");
      router.refresh();
    } catch (error) {
      toast.error("Something Went wrong");
    }
  };

  // Add disklike to the comment
  const addDisklike = async () => {
    if (!id) {
      toast.error("Invalid Review");
      return;
    }

    let data = {};
    data.userId = userId;
    data.reviewId = id;
    data.type = "dislike";

    try {
      await axios.post(`/api/like`, data);
      toast.success("Successfull");
      router.refresh();
    } catch (error) {
      toast.error("Something Went wrong");
    }
  };

  console.log(likes);

  // Calculate the count of likes and dislikes
  const likesCount = likes.filter((like) => like.type === "like").length;
  const dislikesCount = likes.filter((like) => like.type === "dislike").length;

  // Check if the current user has liked or disliked the review
  const isLiked = likes.some(
    (like) => like.type === "like" && like.userId === currentUser?.id
  );
  const isDisliked = likes.some(
    (like) => like.type === "dislike" && like.userId === currentUser?.id
  );

  return (
    <div className="card bg-white shadow-md rounded-md p-5 mb-5">
      <div className="flex justify-between">
        <div className="flex-1 flex flex-col lg:flex-row gap-5">
          <div className="flex-1 h-full flex flex-col justify-between">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src={User?.image || "/images/placeholder.jpg"} />
              </Avatar>
              <div>
                <h5 className="font-bold">{User.name}</h5>
                <p className="">{comment}</p>
              </div>
            </div>
            {currentUser && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp
                    className="cursor-pointer"
                    onClick={addLike}
                    fill={isLiked ? "blue" : "white"}
                  />{" "}
                  {likesCount}
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown
                    className="cursor-pointer"
                    onClick={addDisklike}
                    fill={isDisliked ? "blue" : "white"}
                  />
                  {dislikesCount}
                </div>
              </div>
            )}
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
