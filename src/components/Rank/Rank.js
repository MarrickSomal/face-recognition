import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='text'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='count'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;