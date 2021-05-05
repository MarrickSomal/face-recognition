import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav className="navigation-bar">
          <button onClick={() => onRouteChange('signout')} className='navigation-links'>Sign Out</button>
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