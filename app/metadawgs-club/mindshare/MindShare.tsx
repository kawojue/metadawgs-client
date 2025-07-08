"use client";

import MindCard from "@/components/custom/MIndCard";
// import { FadeIn } from "@/components/custom/ScrollAnimation";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { fetchWithAuth } from "@/lib/api";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import useLocalStorage from "use-local-storage";
import TopBanner from "./TopBanner";
import { MindShareType } from "@/lib/type";
import { XRefreshPosts } from "@/lib/values";
import { Loader } from "lucide-react";

function MindShare() {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<MindShareType[]>([]);

  const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");

  const fetchPosts = useCallback(async () => {
    if (!userToken) {
      setPosts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const endpoint = `/posts/mindshare/entries`;

      const { data } = await fetchWithAuth<MindShareType[]>(endpoint);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setError("Failed to load quests. Please try again later.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, refreshPosts]);

  const postsGrid = useMemo(() => {
    if (loading) {
      return (
        <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
          <Loader size={48} className="animate-spin text-[#FFBE00]" />
          <h3 className="text-2xl font-fredoka mt-4">Loading Quests...</h3>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
          <h3 className="text-2xl font-fredoka text-red-500">{error}</h3>
          <Button
            onClick={fetchPosts}
            className="mt-4 bg-[#FFBE00] text-black hover:bg-[#FFBE00]/80"
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
          <h3 className="text-2xl font-fredoka capitalize">No Posts</h3>
        </div>
      );
    }

    return (
      <div className="grid xl:grid-cols-3 md:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:place-items-center grid-cols-2 gap-3 mt-7">
        {posts.map((post) => (
          <MindCard post={post} key={post.id} />
        ))}
      </div>
    );
  }, [loading, error, posts, fetchPosts]);

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <div className="conquests space-y-16 p-6">
          <div className="social_quests md:mx-[5%] space-y-4 lg:mx-[18%]">
            <TopBanner />
            <br />
            <div className="space-y-5">
              <h2 className="title text-center md:text-[48px] sm:text-4xl text-3xl font-fredoka font-bold text-white">
                Mind Share Quests
              </h2>

              <div>{postsGrid}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MindShare;
