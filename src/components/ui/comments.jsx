import React, { useEffect } from 'react';
import { orderBy } from 'lodash';
import CommentList from '../common/commentList';
import AddCommentForm from '../common/addCommentField';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from '../../store/comments';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }));
  };

  const handleRemove = (id) => {
    dispatch(removeComment(id));
  };
  const sortComment = orderBy(comments, ['created_at'], ['desc']);
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortComment.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentList comments={sortComment} onRemove={handleRemove} />
            ) : (
              'Loading comments'
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
