import "./Comment.css";

const Comment = ({ comment }) => {
  console.log("zeig her bro", comment);
  return (
    <div className="commentContainer">
      <div className="commentHeader">
        <span className="commentAuthor">{comment?.author} </span>
        <span className="commentedOn"> - </span>
        <span className="commentTimestamp">
          {new Date(comment?.timestamp).toLocaleDateString()}
        </span>
      </div>
      <div className="commentBody">{comment?.commentText}</div>
    </div>
  );
};

export default Comment;
