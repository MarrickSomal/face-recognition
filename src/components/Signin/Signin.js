import React, {useState}  from 'react';

function Signin(props) {

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('')

  const onEmailChange = (event) => {
    const newEmail = event.target.value;
    setSignInEmail(newEmail);
  }

  const onPasswordChange = (event) => {
    const newPassword = event.target.value;
    setSignInPassword(newPassword);
    console.log(newPassword)
    console.log(signInPassword)
  }

  const onSubmitSignIn = () => {
    fetch('https://young-beyond-45329.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
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
      <article className="signin-section">
        <main className="signin-form">
          <div className="form-width">
            <fieldset id="sign_up" className="form-fieldset">
              <legend className="form-legend">Sign In</legend>
              <div className="field-spacing">
                <label className="field-label" htmlFor="email-address">Email</label>
                <input
                  className="field-input"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={signInEmail}
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
                  value={signInPassword}
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="field-spacing">
              <button
                onClick={onSubmitSignIn}
                className="signin-button"
                type="submit"
                value="Sign in"
              >
                Sign in
              </button>
            </div>
          </div>
        </main>
      </article>
    );
  }

export default Signin;