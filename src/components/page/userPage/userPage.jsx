import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import UserQualities from '../../ui/userQualities';
import UserAvatar from '../../ui/userAvatar';
import Comments from '../../ui/comments';
import UserMeetings from '../../ui/userMeetings';
import { useUser } from '../../../hooks/useUsers';
const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);
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
              <Comments />
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
