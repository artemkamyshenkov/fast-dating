import React from 'react';
import PropTypes from 'prop-types';
const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number === 0) return 'Никто не будет с тобой тусить, шляпа:(';
    else if (number === 1) return '1 человек тусанет с тобой сегодня';
    else if (number > 1 && number <= 4) return `${number} человека тусанет с тобой сегодня`;
    else {
      return `${number} человек тусанут с тобой сегодня`;
    }
  };
  return (
    <h2>
      {' '}
      <span className={'badge p-2 ' + (length > 0 ? 'bg-primary' : 'bg-danger')}>{renderPhrase(length)}</span>
    </h2>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number,
};
export default SearchStatus;
