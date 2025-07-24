"use client";

import PostCard from "@/components/custom/PostCard";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { fetchWithAuth } from "@/lib/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useLocalStorage from "use-local-storage";
import { PostType, MetaType } from "@/lib/type";
import { XRefreshPosts } from "@/lib/values";
import { Loader } from "lucide-react";
import DarkPagination from "@/components/custom/DarkPagination";
import { useRouter, useSearchParams } from "next/navigation";

function RaidersGrid({ activeTab }: { activeTab: "live" | "past" }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { userToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [meta, setMeta] = useState<MetaType | null>(null);
  const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = 15;

  const fetchPosts = useCallback(
    async (page: number = 1) => {
      if (!userToken) {
        setPosts([]);
        setMeta(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const endpoint = `/posts?tab=${activeTab}&special=false&page=${page}&limit=${limit}`;

        const response = await fetchWithAuth<{
          data: PostType[];
          meta: MetaType;
        }>(endpoint);

        setPosts(response.data.data);
        setMeta(response.data.meta);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to load quests. Please try again later.");
        setPosts([]);
        setMeta(null);
      } finally {
        setLoading(false);
      }
    },
    [userToken, limit, activeTab]
  );

  useEffect(() => {
    fetchPosts(currentPage);
  }, [fetchPosts, refreshPosts, currentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

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
            onClick={() => fetchPosts(currentPage)}
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
          <h3 className="text-2xl font-fredoka capitalize">
            No {activeTab} Quests
          </h3>
        </div>
      );
    }

    return (
      <>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:place-items-center grid-cols-2 gap-3 mt-7">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>

        {meta && meta.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <DarkPagination meta={meta} onPageChange={handlePageChange} />
          </div>
        )}
      </>
    );
  }, [loading, error, posts, meta, fetchPosts, currentPage, activeTab]);

  return postsGrid;
}

export default RaidersGrid;