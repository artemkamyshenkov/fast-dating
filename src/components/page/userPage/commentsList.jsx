import React from 'react';
import PropTypes from 'prop-types';
import Comments from './comments';

const CommentsList = ({ comments }) => {
  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>Comments</h2>
        <hr />

        {comments.map((comment) => {
          <Comments {...{ comment }} />;
        })}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
};
export default CommentsList;
