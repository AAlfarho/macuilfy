import React from 'react';
import { withRouter, Link } from 'react-router-dom';
class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  componentDidMount(){
    this.props.receiveErrors([]);
  }

  componentWillReceiveProps(newProps){
    //if the new props include the user logged in, redirect to root
    if(newProps.loggedIn){
      this.props.history.push("/");
    }

    if(newProps.location.pathname !== this.props.location.pathname){
      //if different url, clear the errors
      this.props.receiveErrors([]);
    }
    clearTimeout(this.clearInterval);
  }

    componentWillUnmount(){
      clearTimeout(this.clearInterval);
    }

    handleSubmit(event){
    event.preventDefault();
    const user = this.state;
    this.props.formAction(user);
  }

  handleDemoLogin(event){
    event.preventDefault();
    //not sure if this is the proper way of doing this.
    const demoUser = {
      username: 'sys-g',
      password: 'password'
    };
    this.setState({
        username: '',
        password: ''
    });
    let username = Array.from('sys-g');
    let password = Array.from('password');
    this.clearInterval = setInterval(() => {
        if (username.length) {
            this.setState({ username: (this.state.username + username.shift())});
        } else if (password.length) {
            this.setState({ password: (this.state.password + password.shift())});
        } else {
            clearTimeout(this.clearInterval);
            this.props.demoLogin(demoUser);
        }
    },100);

  }

  handleChange(field){
    return e => this.setState({[field]: e.target.value});
  }

  renderErrors() {
    return(
      <div className="error-container">
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render(){
    const {username, password, email} = this.state;
    const signupFlow = this.props.formType !== 'login';
    const submitButtonText = signupFlow ? 'Sign up' : 'Login';
    return(
      <div className="splash">
        <div className="hero-image">
          <div className="session-form-wrapper">
            <div className="display-options">
              <div className="left-most-options">
                <div className="extra-small-logo">
                  <Link to="/">
                    <img alt="" src="https://open.scdn.co/static/images/logo-white-2x.png"/>
                  </Link>
                </div>
                <div className="separator-container">
                  <div className="separator-line"></div>
                  <div className="separator-line"></div>
                </div>
                <div className="session-container">
                  {this.renderErrors()}
                  <form className="session-form"onSubmit={this.handleSubmit}>
                    <input type="text" id="username-input" placeholder='Username' value={username}
                      onChange={this.handleChange('username')}/>
                    {
                      signupFlow &&
                      <input type="text" placeholder='Email' value={email}
                        onChange={this.handleChange('email')}/>
                    }
                    <input type='password' value={password} onChange={this.handleChange('password')} placeholder="Password"/>
                    <input className="btn btn-green btn-xl" type="submit" value={submitButtonText}/>
                    <button onClick={this.handleDemoLogin}
                            className="btn btn-xl btn-white" data-or="or">
                        Demo Login
                      </button>
                  </form>
                  <div>
                    {
                        signupFlow ?
                        <div>
                          <p>
                            Already have an account?
                          </p>
                          <Link className="green-link" to="/login">
                            Log in
                          </Link>
                        </div>
                        :
                        <div>
                          <p>
                            Don't have an account?
                          </p>
                          <Link className="green-link" to="/signup">
                            Sign Up
                          </Link>
                        </div>
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
