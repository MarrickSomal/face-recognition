import React from 'react';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className='face-section'>
      <div className='face-container'>
        <img id='inputimage' alt='' src={imageUrl} className='face-image'/>
        {boxes.map(box =>
          <div key={`box${box.topRow}${box.rightCol}`}
              className='bounding-box'
              style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
          </div>
        )}
      </div>
    </div>
  );
}

export default FaceRecognition;