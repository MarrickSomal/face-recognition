import React, {ChangeEvent, Component } from "react";

interface ProfileProps {
  user: any,
  toggleModal: any,
  loadUser: any
}

interface ProfileState {
  name: string,
  age: string,
  pet: string,
}

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json')
requestHeaders.append('Authorization', 'window.sessionStorage.getItem("token")');

class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
    } as ProfileState;
  }

  onProfileUpdate = (data: any) => {
    fetch(`https://young-beyond-45329.herokuapp.com/profile/${this.props.user.id}`, {
      method: "post",
      headers: requestHeaders,
      body: JSON.stringify({
        formInput: data,
      }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
          console.log(this.props.user)
        }
      })
      .catch(console.log);
  };

  onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  render() {
    const { toggleModal, user } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="profile-box">
          <main className="profile-form">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="profile-image"
              alt="avatar"
            />
            <h1>{name}</h1>
            <h4>{`Images submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
            <label className="form-label" htmlFor="user-name">
              Name:
            </label>
            <input
              onChange={this.onFormChange}
              type="text"
              name="user-name"
              className="form-input"
              placeholder={name}
            ></input>
            <label className="form-label" htmlFor="user-age">
              Age:
            </label>
            <input
              onChange={this.onFormChange}
              type="text"
              name="user-age"
              className="form-input"
              placeholder={age}
            ></input>
            <label className="form-label" htmlFor="user-pet">
              Favourite Pet:
            </label>
            <input
              onChange={this.onFormChange}
              type="text"
              name="user-pet"
              className="form-input"
              placeholder={pet}
            ></input>
            <div className="button-section">
              <button
                className="save-button"
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button className="cancel-button" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
