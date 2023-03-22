import React from 'react';
import api from '../../api';
import { orderBy } from 'lodash';
import CommentList from '../common/commentList';
import AddCommentForm from '../common/addCommentField';
import { useComments } from '../../hooks/useComments';

const Comments = () => {
  const { createComment, comments } = useComments();

  const handleSubmit = (data) => {
    createComment(data);
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, data]));
  };

  const handleRemove = (id) => {
    // api.comments.remove(id).then((id) => {
    //   setComments(comments.filter((comment) => comment._id !== id));
    // });
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
            <CommentList comments={sortComment} onRemove={handleRemove} />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
