import React from 'react';
import randomUserAvatar from '../../../utils/randomuserAvatar';
import PropTypes from 'prop-types';

const Comments = ({ comment }) => {
  console.log(comment);
  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={randomUserAvatar()}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 mr-1">
                    User Name
                    <span className="small">Published Time</span>
                  </p>
                  <button className="btn btn-sm text-primary d-flex align-items-center">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comment: PropTypes.object,
};
export default Comments;
