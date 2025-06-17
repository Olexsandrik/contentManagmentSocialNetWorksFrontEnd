import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { CommentCard } from "../CommentsCard";

interface CommentsSectionProps {
  postId: string;
  comments: any[];
  openCommentPostId: string | null;
}

export const CommentsSection = ({
  postId,
  comments,
  openCommentPostId,
}: CommentsSectionProps) => {
  if (!openCommentPostId || openCommentPostId !== postId) {
    return null;
  }

  const postComments =
    comments.find((c) => c.postId === postId)?.comments || [];

  return (
    <div className="w-full md:w-80 lg:w-96 p-4 bg-gray-50 rounded-xl shadow border border-gray-200 transition-all max-h-[600px] overflow-y-auto sticky top-4">
      <h4 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
        <ChatBubbleOvalLeftIcon className="h-5 w-5 text-blue-500 mr-2" />
        Comments ({postComments.length})
      </h4>
      <div className="space-y-3">
        {postComments.map((comment: any) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
