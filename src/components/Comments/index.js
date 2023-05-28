import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    count: 0,
    name: '',
    comment: '',
    commentsList: [],
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialContainerBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      nameInput: name,
      commentInput: comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialContainerBackgroundClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onUpdateNameField = event => {
    this.setState({name: event.target.value})
  }

  onUpdateCommentField = event => {
    this.setState({comment: event.target.value})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  render() {
    const {commentsList, comment, name, count} = this.state
    return (
      <div className="comments-app-bg-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-inputs-container">
            <form className="forms" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say Something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input-field"
                placeholder="Your Name"
                value={name}
                onChange={this.onUpdateNameField}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input-field"
                rows="6"
                value={comment}
                onChange={this.onUpdateCommentField}
              />
              <div>
                <button type="submit" className="add-button">
                  Add Comment
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comment-image"
              alt="comments"
            />
          </div>
          <hr className="seperation-line" />
          <p className="comments-heading">
            <span className="comments-count">{count}</span> Comments
          </p>
          <ul className="comments-list-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                eachCommentDetails={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
