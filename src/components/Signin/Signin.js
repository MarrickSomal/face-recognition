import React, {useCallback, useEffect, useRef, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';

//faciliates the forgotten password reset email sent pop-up
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Signin(props) {

  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  
  /*useRef hook stores any mutable value we like, so we use that to keep track
    of the first time the useEffect function is being run. This allows us to enusre
    useEffect does not run on the initial page load*/
  const isInitialMount = useRef(true);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('')
  const [submit, setSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Error states, for field validation
  let [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  let [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  //an object of all the error boolean states
  const validationObject = {
    emailError: emailError,
    passwordError: passwordError,
    submit: submit
  }

    //runs on every component update
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
      /*if all fields have error states set to false (no errors) 
      then send data, else do not send data*/
      else if (Object.values(validationObject)
      .every(item => item === false)) {
        onSignIn()
      }
    }, [submit] );


  //Change handlers
  const onEmailChange = (event) => {
    const newEmail = event.target.value;
    setSignInEmail(newEmail);
  }

  const onPasswordChange = (event) => {
    const newPassword = event.target.value;
    setSignInPassword(newPassword);
  }

  const saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  //Sign-in error pop-up handlers
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //Clicking on Sign in button triggers field validation checks
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(false);
    handleEmailValidation();
    handlePasswordValidation();
  }

  //Field validation checks
  const handleEmailValidation = () => {

    if(!validEmailRegex.test(signInEmail)){
      setEmailError(true)
      setEmailErrorText("Field is required in valid format")
      setSubmit(true);
    } else {
      setEmailError(false)
      setEmailErrorText("")
    } 
  }

  const handlePasswordValidation = () => {

    if(signInPassword.length < 6){
      setPasswordError(true)
      setPasswordErrorText("A password of 6 characters or more is required")
      setSubmit(true)
    } else {
      setPasswordError(false)
      setPasswordErrorText("")
    } 
  }

  const onSignIn = () => {
    setLoading(true)
    fetch('https://young-beyond-45329.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success === "true") {
          setLoading(false)
          saveAuthTokenInSessions(data.token)
          props.loadUser(data.user)
          props.onRouteChange('home');
        } else {
          setSubmit(true)
          setLoading(false)
          handleClick()
        }
      })
      .catch(console.log)
  }

    return (
      <article className="signin-section">
        <main className="signin-form">
          <div className="signin-width">
            <fieldset id="sign_up" className="signin-fieldset">
              <legend className="signin-legend">Sign In</legend>
              <div className="signin-spacing">
                <label className="signin-label" htmlFor="email-address">Email</label>
                <TextField
                  className="signin-input"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={signInEmail}
                  onChange={onEmailChange}
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorText}
                />
              </div>
              <div className="signin-spacing">
                <label className="signin-label" htmlFor="password">Password</label>
                <TextField
                  className="signin-input"
                  type="password"
                  name="password"
                  id="password"
                  value={signInPassword}
                  onChange={onPasswordChange}
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorText}
                />
              </div>
            </fieldset>
            <div className="signin-spacing">
            {loading ?
              <div>
                <CircularProgress />
              </div> :
              <div>
              <button
                onClick={handleSubmit}
                className="signin-button"
                type="submit"
                value="Sign in"
              >
                Sign in
              </button>
              </div> }
                <div className="signin-error-message">
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error">
                    System cannot find sign-in credentials, please enter different credentials or register
                  </Alert >
                </Snackbar>
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }

export default Signin;