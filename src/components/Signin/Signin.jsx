import React, { Component } from "react";
import './Signin.css'
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sgininEmal: "",
      sgininPassword: "",
      
    }
  }
  onEmailchange= (event)=>{
    this.setState({
      sgininEmal: event.target.value})
  }
  onPasswrodChange=(event)=>{
    this.setState({
      sgininPassword:event.target.value
    })
  }
  isSignInAllowed = (res) => {

    return res.name !== "NONE";
  }
  
  onSubmit = () => {
    const { sgininEmal, sgininPassword } = this.state;
  
    fetch("http://127.0.0.1:5000/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: sgininEmal,
        password: sgininPassword
      })
    })
      .then(res => res.json())  // Extract JSON data from the response
      .then(res => this.isSignInAllowed(res) ?(this.props.onRouteChnage("home"),this.props.setUser(res)) : null)
      .catch(error => console.error('Error:', error));
  }
  

  render() {
    const { onRouteChnage } = this.props;
    return (
      <article className="signin br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
        <main className="pa4 white-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailchange}

                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswrodChange}

                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() =>this.onSubmit()}
                className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChnage("register")} className="f6 link dim white b--white db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}
export default Signin;