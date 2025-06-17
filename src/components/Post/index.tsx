import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ChatBubbleLeftIcon,
  ArrowsUpDownIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import type { SocialMediaPost } from "../../app/type";
import { Loading } from "../Loading";
import { BASE_URL } from "../../constants";
import { usePostPaginationGet } from "../../servers/usePostPaginationGet";
import { Pagination, Stack } from "@mui/material";
import { CommentsSection } from "../ CommentsSection";

export const Post = () => {
  const [page, setPage] = useState(1);

  const { posts, comments, setPosts, meta, error, isLoading } =
    usePostPaginationGet("server/instagramdata-pagination", page, 5);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null
  );

  console.log(comments);

  useEffect(() => {
    const sortedPosts = sortPosts(posts, sortOrder);
    setPosts(sortedPosts);
  }, [sortOrder]);

  const sortPosts = (posts: SocialMediaPost[], sortOrder: string) => {
    return [...posts].sort((a, b) => {
      const mainA = new Date(a.timestamp).getTime();
      const mainB = new Date(b.timestamp).getTime();

      return sortOrder === "desc" ? mainA - mainB : mainB - mainA;
    });
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  const toggleComments = (postId: string) => {
    const found = comments.find((c: any) => c.postId === postId);
    if (found) {
      setOpenCommentPostId((prev) => (prev === postId ? null : postId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy HH:mm");
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="w-full   max-w-7xl px-4 sm:px-6 md:px-8 ">
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-6 gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Instagram Posts
            </h1>
            <button
              onClick={toggleSortOrder}
              className="flex items-center px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"
            >
              <span className="mr-2 text-sm sm:text-base">Sort by Date</span>
              <ArrowsUpDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 flex-1 ">
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden w-full mb-6"
                >
                  <div className="p-3 sm:p-4 flex items-center space-x-3 border-b">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">
                        IG
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        Instagram User
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {formatDate(post.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="aspect-square w-full relative">
                    {post.mediaType === "IMAGE" ? (
                      <img
                        src={post.mediaUrl || "/placeholder.svg"}
                        alt={post.caption || "Instagram post"}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        src={`${BASE_URL}${post.mediaUrl}`}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {post.caption && (
                    <div className="p-3 sm:p-4 border-b">
                      <p className="text-sm sm:text-base text-gray-800">
                        {post.caption}
                      </p>
                    </div>
                  )}

                  <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex items-center text-gray-700 text-sm">
                        <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-1" />
                        <span>{post.likeCount}</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm">
                        <ChatBubbleOvalLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-1" />
                        <span>{post.commentsCount || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-blue-600 hover:underline"
                      >
                        View on Instagram
                      </a>
                      {post.commentsCount > 0 && (
                        <button
                          onClick={() => toggleComments(post.id)}
                          className="relative group"
                          title="Show comments"
                        >
                          <ChatBubbleLeftIcon
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${openCommentPostId === post.id ? "text-blue-600" : "text-gray-500 hover:text-blue-500"} transition-colors`}
                          />
                          {openCommentPostId !== post.id && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                              {post.commentsCount > 9
                                ? "9+"
                                : post.commentsCount}
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {meta && meta.totalPages > 1 && posts && (
              <div className="py-4 border-t mt-4">
                <Stack spacing={2} alignItems="center">
                  <Pagination
                    count={meta.totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:w-80 xl:w-96 lg:flex-shrink-0 lg:sticky lg:top-6 lg:self-start h-fit">
        {openCommentPostId ? (
          <CommentsSection
            postId={openCommentPostId}
            comments={comments}
            openCommentPostId={openCommentPostId}
          />
        ) : (
          <div className="w-full md:w-80 lg:w-96 p-4 bg-gray-50 rounded-xl shadow border border-gray-200">
            <p className="text-gray-500 text-center py-4">
              No comments to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
