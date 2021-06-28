import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

interface ProfileProps {
  toggleModal: any,
  loadUser: any,
  onRouteChange: any,
}

interface ProfileState {
  dropdownOpen: boolean,
}

class ProfileIcon extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      dropdownOpen: false,
    } as ProfileState;
  }

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    return (
      <div className="icon-area">
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          drop="left"
        >
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="icon-image"
              alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu
            style={{
              marginLeft: "-6rem",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <DropdownItem onClick={() => this.props.toggleModal()}>
              View Profile
            </DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange("signout")}>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
