import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ChatBubbleLeftIcon,
  ArrowsUpDownIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import {SocialMediaPost } from "../../app/type";
import { usePostGet } from "../../hooks/usePostGet";
import { Loading } from "../Loading";
import { BASE_URL } from "../../constants";

export const Post = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedComments, setExpandedComments] = useState<
    Record<string, boolean>
  >({});

  const { posts, setPosts, isLoading, error } = usePostGet(
    "server/instagram-data"
  );

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
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy HH:mm");
  };
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  console.log(posts);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }
  return (
    <div className="bg-white ">
      <div className="p-8 ml-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Instagram Posts
          </h1>
          <button
            onClick={toggleSortOrder}
            className="flex items-center px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"
          >
            <span className="mr-2">Sort by Date</span>
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 ">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl object-fill shadow-md overflow-hidden w-96 mb-12"
            >
              <div className="p-4 flex items-center space-x-3 border-b">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center">
                  <span className="text-white font-bold">IG</span>
                </div>
                <div>
                  <h3 className="font-semibold">Instagram User</h3>
                  <p className="text-xs text-gray-500 flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {formatDate(post.timestamp)}
                  </p>
                </div>
              </div>

              {post.mediaType === "IMAGE" ? (
                <img
                  src={post.mediaUrl}
                  alt={post.caption || "Instagram post"}
                  className="w-96 h-96 object-contain rounded mb-2"
                />
              ) : (
                <video
                  src={`${BASE_URL}${post.mediaUrl}`}
                  controls
                  className="w-96 h-96 object-cover rounded mb-2"
                />
              )}

              {post.caption && (
                <div className="p-4 border-b">
                  <p className="text-gray-800">{post.caption}</p>
                </div>
              )}

              <div className="px-4 py-3 flex items-center justify-between border-b">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-700">
                    <HeartIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span>{post.likeCount}</span>
                  </div>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center text-gray-700"
                  >
                    <ChatBubbleOvalLeftIcon className="h-5 w-5 text-blue-500 mr-1" />
                    <span>{post.commentsCount || 0}</span>
                  </button>
                </div>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View on Instagram
                </a>
              </div>

              {expandedComments[post.id] &&
                post.comments &&
                post.comments.length > 0 && (
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-700 mb-3">Comments</h4>
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {comment.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <p className="text-sm font-medium">
                                {comment.username}
                              </p>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(comment.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="p-4 flex justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center text-gray-700 hover:text-blue-500"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
