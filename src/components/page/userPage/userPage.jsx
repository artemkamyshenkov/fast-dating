import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import UserQualities from '../../ui/userQualities';
import UserAvatar from '../../ui/userAvatar';
import CommentsList from './commentsList';
import UserMeetings from '../../ui/userMeetings';
const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  if (user) {
    return (
      <div>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserAvatar user={user} />
              <UserQualities quality={user.qualities} />
              <UserMeetings meetings={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <CommentsList comments={comments} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
