"use client";

import { BarChart2, Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

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
    image?: string;
    verified: boolean;
  };
}) => {
  return (
    <div className="bg-black p-4 transition-colors cursor-pointer">
      <div className="flex gap-3">
        {/* Profile Picture */}
        <Avatar className="w-10 h-10 min-w-10 min-h-10">
          <AvatarImage src={tweet.profilePic} alt={tweet.username} />
          <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
        </Avatar>

        {/* Tweet Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1 mb-1">
            <span className="font-bold text-white hover:underline cursor-pointer truncate">
              {tweet.username}
            </span>
            {tweet.verified && (
              <svg
                className="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.284-1.525c-.321-.214-.407-.64-.193-.96.214-.32.640-.407.96-.193L10.006 14.4l3.73-5.6c.192-.288.577-.36.865-.168.287.193.36.577.167.865z" />
              </svg>
            )}
            <span className="text-gray-500 truncate">{tweet.handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 hover:underline cursor-pointer">
              {tweet.timestamp}
            </span>
            <div className="ml-auto">
              <div className="p-1 rounded-full hover:bg-gray-800 cursor-pointer">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tweet Text */}
          <div className="text-white mb-3 text-[15px] leading-5 whitespace-pre-wrap">
            {formatTweetContent(tweet.content)}
          </div>

          {/* Tweet Image */}
          {tweet.image && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-gray-800">
              <Image
                height={367}
                width={450}
                src={tweet.image}
                alt="Tweet image"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Engagement Stats */}
          <div className="flex justify-between mt-3 text-gray-500">
            {/* Comments */}
            <div className="flex items-center hover:text-blue-400 cursor-pointer group">
              <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                <MessageCircle size={18} />
              </div>
              <span className="text-sm ml-1">{tweet.comments}</span>
            </div>

            {/* Retweets */}
            <div className="flex items-center hover:text-green-400 cursor-pointer group">
              <div className="p-2 rounded-full group-hover:bg-green-400/10 transition-colors">
                <Repeat2 size={18} />
              </div>
              <span className="text-sm ml-1">{tweet.retweets}</span>
            </div>

            {/* Likes */}
            <div className="flex items-center hover:text-red-500 cursor-pointer group">
              <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                <Heart size={18} />
              </div>
              <span className="text-sm ml-1">{tweet.likes}</span>
            </div>

            {/* Views */}
            <div className="flex items-center hover:text-blue-400 cursor-pointer group">
              <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                <BarChart2 size={18} />
              </div>
              <span className="text-sm ml-1">{tweet.views}</span>
            </div>

            {/* Share */}
            <div className="flex items-center hover:text-blue-400 cursor-pointer group">
              <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                <Share size={18} />
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
