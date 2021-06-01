import React, {useCallback, useEffect, useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';

function Register(props) {

  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  
  /*useRef hook stores any mutable value we like, so we use that to keep track
    of the first time the useEffect function is being run. This allows us to enusre
    useEffect does not run on the initial page load*/
  const isInitialMount = useRef(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(true);

  // Error states, for field validation
  let [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');

  let [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  let [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  //an object of all the error boolean states
  const validationObject = {
    nameError: nameError,
    emailError: emailError,
    passwordError: passwordError,
    submit: submit
  }

  //Function to send registration data to server
  const onRegistration = () => {
    fetch(process.env.REGISTER, {
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

    //runs on every component update
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
      /*if all fields have error states set to false (no errors) 
      then send data, else do not send data*/
      else if (Object.values(validationObject)
      .every(item => item === false)) {
        onRegistration()
      }
    }, [submit] );
  
  //Change handlers
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

  //Clicking on Sign in button triggers field validation checks
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(false);
    handleNameValidation();
    handleEmailValidation();
    handlePasswordValidation();
  }

  //Field validation checks
  const handleNameValidation = () => {

    if(name === ""){
      setNameError(true)
      setNameErrorText("Field is required")
      setSubmit(true)
    } else {
      setNameError(false)
      setNameErrorText("")
    } 
  }

  const handleEmailValidation = () => {

    if(!validEmailRegex.test(email)){
      setEmailError(true)
      setEmailErrorText("Field is required in valid format")
      setSubmit(true);
    } else {
      setEmailError(false)
      setEmailErrorText("")
    } 
  }

  const handlePasswordValidation = () => {

    if(password.length < 6){
      setPasswordError(true)
      setPasswordErrorText("A password of 6 characters or more is required")
      setSubmit(true)
    } else {
      setPasswordError(false)
      setPasswordErrorText("")
    } 
  }

    return (
      <article className="register-section">
        <main className="register-form">
          <div className="register-width">
            <fieldset id="sign_up" className="register-fieldset">
              <legend className="register-legend">Register</legend>
              <div className="register-spacing">
                <label className="register-label" htmlFor="name">Name</label>
                <TextField
                  className="register-input"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onNameChange}
                  variant="outlined"
                  error={nameError}
                  helperText={nameErrorText}
                />
              </div>
              <div className="register-spacing">
                <label className="register-label" htmlFor="email-address">Email</label>
                <TextField
                  className="register-input"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={email}
                  onChange={onEmailChange}
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorText}
                />
              </div>
              <div className="register-spacing">
                <label className="register-label" htmlFor="password">Password</label>
                <TextField
                  className="register-input"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onPasswordChange}
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorText}
                />
              </div>
            </fieldset>
            <div className="register-spacing">
              <button
                onClick={handleSubmit}
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