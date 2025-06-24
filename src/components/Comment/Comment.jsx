import "./Comment.css";

const Comment = ({ comment }) => {
  console.log("Comment component rendered with comment:", comment);
  return (
    <div className="commentContainer">
      <div className="commentHeader">
        {comment?.author} {comment?.timestamp}
      </div>
      <div className="commentBody">{comment?.commentText}</div>
    </div>
  );
};

export default Comment;
