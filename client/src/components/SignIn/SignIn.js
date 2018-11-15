
import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import {
  Label,
  Input,
  SignModalMain,
  RegisterButton,
} from '../../styles/SignIn_UpStyle';


class SignIn extends React.Component {
  //Basic state
  state = {
    email: '',
    password: '',
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clickRegister = () => {
    this.props.history.push('/signup');
  };

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain>
          <h2>{this.props.currentSignedInUser ? `Welcome ${this.props.currentSignedInUser.firstName}` : 'Sign In'}</h2>
          <form onSubmit={(e) => {
            this.props.signInWithEmailAndPassword(e, this.state.email, this.state.password)
            this.setState({email: '', password: ''});
            }}>
            <Label htmlFor="email">
              Email
              <Input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <button>Sign In</button>
            <p>
              New here?{' '}
              <RegisterButton onClick={this.clickRegister}>
                Register here
              </RegisterButton>
            </p>
            <RegisterButton onClick={this.props.signUpWithGoogleAuthentication}>
                Sign in with Google.
              </RegisterButton>
          </form>
          <button onClick = {(e) => {
            this.props.signOutCurrentUser(e)
            }}>Sign Out</button>
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignIn;
