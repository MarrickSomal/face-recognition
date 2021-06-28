import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

interface Navigation {
  onRouteChange: any,
  isSignedIn: any,
  toggleModal: any,
  loadUser: any
}

const Navigation = ({ onRouteChange, isSignedIn, toggleModal, loadUser }: Navigation) => {
  if (isSignedIn) {
    return (
      <nav className="navigation-bar">
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} loadUser={loadUser}/>
      </nav>
    );
  } else {
    return (
      <nav className="navigation-bar">
        <button
          onClick={() => onRouteChange("signin")}
          className="navigation-links"
        >
          Sign In
        </button>
        <button
          onClick={() => onRouteChange("register")}
          className="navigation-links"
        >
          Register
        </button>
      </nav>
    );
  }
};

export default Navigation;
