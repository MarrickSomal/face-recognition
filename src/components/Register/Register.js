import React, {useState} from 'react';

function Register(props) {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  }

  const onEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  }

  const onPasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  }



  const onSubmitSignIn = () => {
    fetch('https://young-beyond-45329.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          props.loadUser(user)
          props.onRouteChange('home');
        }
      })
  }

    return (
      <article className="register-section">
        <main className="register-form">
          <div className="form-width">
            <fieldset id="sign_up" className="form-fieldset">
              <legend className="form-legend">Register</legend>
              <div className="field-spacing">
                <label className="field-label" htmlFor="name">Name</label>
                <input
                  className="field-input"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onNameChange}
                />
              </div>
              <div className="field-spacing">
                <label className="field-label" htmlFor="email-address">Email</label>
                <input
                  className="field-input"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={email}
                  onChange={onEmailChange}
                />
              </div>
              <div className="field-spacing">
                <label className="field-label" htmlFor="password">Password</label>
                <input
                  className="field-input"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="field-spacing">
              <button
                onClick={onSubmitSignIn}
                className="register-button"
                type="submit"
                value="Register"
              >
                Register
              </button>
            </div>
          </div>
        </main>
      </article>
    );
  }

export default Register;