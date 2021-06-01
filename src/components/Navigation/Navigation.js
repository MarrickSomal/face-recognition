import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
    if (isSignedIn) {
      return (
        <nav className="navigation-bar">
          <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
        </nav>
      );
    } else {
      return (
        <nav className="navigation-bar">
          <button onClick={() => onRouteChange('signin')} className='navigation-links'>Sign In</button>
          <button onClick={() => onRouteChange('register')} className='navigation-links'>Register</button>
        </nav>
      );
    }
}

export default Navigation;