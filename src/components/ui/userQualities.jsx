import React from 'react';
import Qualities from './qualities';
import PropTypes from 'prop-types';
const UserQualities = ({ quality }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <div>
          <Qualities qualities={quality} />
        </div>
      </div>
    </div>
  );
};

UserQualities.propTypes = {
  quality: PropTypes.array,
};
export default UserQualities;
