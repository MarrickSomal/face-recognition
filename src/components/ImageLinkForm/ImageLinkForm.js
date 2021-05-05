import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <div className='image-link-section'>
      <p className='image-text'>
        {'To detect faces in your pictures paste an image web address in the below box and click Detect!'}
      </p>
      </div>
        <div className='image-link-section'>
          <input className='image-link-box' type='text' onChange={onInputChange}/>
          <button
            className='detect-button'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
    </div>
  );
}

export default ImageLinkForm;