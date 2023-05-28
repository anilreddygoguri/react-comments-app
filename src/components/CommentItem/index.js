import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {eachCommentDetails, toggleIsLiked, deleteComment} = props
  const {
    id,
    nameInput,
    commentInput,
    isLiked,
    initialClassName,
    date,
  } = eachCommentDetails

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    toggleIsLiked(id)
  }
  const onClickDelete = () => {
    deleteComment(id)
  }
  const postedTime = formatDistanceToNow(date)
  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{nameInput[0].toUpperCase()}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{nameInput}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{commentInput}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button className="button" type="button" onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}
export default CommentItem
