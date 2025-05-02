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
import { usePostPaginationGet } from "../../hooks/usePostPaginationGet";
import { Pagination, Stack } from "@mui/material";

export const Post = () => {
  const [page, setPage] = useState(1);

  const { posts, setPosts, meta, error, isLoading } = usePostPaginationGet(
    "server/instagramdata-pagination",
    page,
    5
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedComments, setExpandedComments] = useState<string | null>(null);

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
    setExpandedComments((prev) => (prev === postId ? null : postId));
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
    <div className="bg-white w-full">
      <div className="p-4 sm:p-6 md:p-8 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center text-gray-700 text-sm"
                  >
                    <ChatBubbleOvalLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-1" />
                    <span>{post.commentsCount || 0}</span>
                  </button>
                </div>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-600 hover:underline"
                >
                  View on Instagram
                </a>
              </div>

              {expandedComments === post.id && post.comments ? (
                <div className="p-3 sm:p-4 bg-gray-50">
                  <h4 className="font-medium text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">
                    Comments
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex space-x-2 sm:space-x-3"
                      >
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">
                            {comment.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                            <p className="text-xs sm:text-sm font-medium">
                              {comment.username}
                            </p>
                            <p className="text-xs sm:text-sm break-words">
                              {comment.text}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(comment.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="p-3 sm:p-4 flex justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center text-gray-700 hover:text-blue-500 text-xs sm:text-sm"
                  >
                    <ChatBubbleLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {meta && meta.totalPages > 1 && posts && (
          <Stack spacing={2} alignItems="center" mt={4}>
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
        )}
      </div>
    </div>
  );
};
