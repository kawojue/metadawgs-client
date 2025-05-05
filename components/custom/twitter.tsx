"use client";

import { BarChart2, Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Individual Tweet component
const Tweet = ({
  tweet,
}: {
  tweet: {
    id: number;
    username: string;
    handle: string;
    profilePic: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    comments: number;
    views: string;
    verified: boolean;
  };
}) => {
  return (
    <div className="bg-black border border-gray-700 p-4 rounded-xl shadow-sm h-full overflow-hidden">
      <div className="flex items-start gap-4">
        <Avatar className="sm:w-10 sm:h-10 sm:min-w-10 sm:min-h-10 w-8 h-8 min-w-8 min-h-8">
          <AvatarImage src={tweet.profilePic} alt={tweet.username} />
          <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex mb-2 gap-1 justify-between">
            <div className="-space-y-1">
              <span className="block font-bold truncate">{tweet.username}</span>
              <span className="block text-gray-500 text-sm truncate">
                {tweet.handle}
              </span>
            </div>

            <span className="text-gray-500 text-sm truncate">
              {tweet.timestamp}
            </span>
          </div>
          <div className="mb-3 text-sm">
            {formatTweetContent(tweet.content)}
          </div>
          <div className="flex justify-between text-gray-500 mt-3">
            <div className="flex items-center hover:text-blue-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-blue-50">
                <MessageCircle
                  size={16}
                  className="group-hover:text-blue-500"
                />
              </div>
              <span className="text-xs group-hover:text-blue-500">
                {tweet.comments}
              </span>
            </div>
            <div className="flex items-center hover:text-green-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-green-50">
                <Repeat2 size={16} className="group-hover:text-green-500" />
              </div>
              <span className="text-xs group-hover:text-green-500">
                {tweet.retweets}
              </span>
            </div>
            <div className="flex items-center hover:text-red-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-red-50">
                <Heart size={16} className="group-hover:text-red-500" />
              </div>
              <span className="text-xs group-hover:text-red-500">
                {tweet.likes}
              </span>
            </div>
            <div className="flex items-center hover:text-blue-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-blue-50">
                <BarChart2 size={16} className="group-hover:text-blue-500" />
              </div>
              <span className="text-xs group-hover:text-blue-500">
                {tweet.views}
              </span>
            </div>
            <div className="flex items-center hover:text-blue-500 cursor-pointer">
              <div className="p-1.5 rounded-full hover:bg-blue-50">
                <Share size={16} className="hover:text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable tweet card component that can be used independently
export const TweetCard = Tweet;

const formatTweetContent = (content: string): ReactNode => {
  return content.split("\n").map((line: string, index: number) => {
    // Convert hashtags and mentions to styled spans
    const formattedLine = line
      .split(" ")
      .map((word: string, wordIndex: number) => {
        if (word.startsWith("#")) {
          return (
            <span
              key={wordIndex}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {word}{" "}
            </span>
          );
        } else if (word.startsWith("@")) {
          return (
            <span
              key={wordIndex}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {word}{" "}
            </span>
          );
        }
        return word + " ";
      });

    return <div key={index}>{formattedLine}</div>;
  });
};
