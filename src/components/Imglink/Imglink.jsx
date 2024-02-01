import React from 'react';
import './Imglink.css';

const ImageLinkForm = ({oninputChnage,onSubmit,description}) => {
  return (
    <div>
      <p className='f3 white'>
        {'Experience the magic of our web app that effortlessly detects faces in photos and provides simple descriptions.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' onChange={oninputChnage}  />
          <button
            className='css-button-rounded--sky'
            onClick={onSubmit}
            
          >Detect</button>
        </div>
      </div>
        <p className='f4 white'>
        {`Image Description: ${description}`}
      </p>
    </div>
  );
}

export default ImageLinkForm;