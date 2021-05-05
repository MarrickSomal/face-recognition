import React from 'react';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='face-section'>
      <div className='face-container'>
        <img id='inputimage' alt='' src={imageUrl} className='face-image'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;