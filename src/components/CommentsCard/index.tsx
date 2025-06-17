import { format } from "date-fns";

interface CommentProps {
  comment: {
    id: string;
    username: string;
    text: string;
    timestamp: string;
  };
}

export const CommentCard = ({ comment }: CommentProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy HH:mm");
  };

  return (
    <div className="flex gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center">
        <span className="text-white text-sm font-bold">
          {comment.username.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-800">
            {comment.username}
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(comment.timestamp)}
          </p>
        </div>
        <p className="text-sm text-gray-700 break-words">{comment.text}</p>
      </div>
    </div>
  );
};
