import React, { Component } from "react";

import '../Signin/Signin.css'
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regName:'',
      regEmail:'',
      regPassword:''
    }
  }

  onEmailchange= (event)=>{
    this.setState({
      regEmail: event.target.value})
  }
  onPasswrodChange=(event)=>{
    this.setState({
      regPassword:event.target.value
    })
  }
  onNameChange=(event)=>{
    this.setState({
      regName:event.target.value
    })
  }
  submitUser = () => {
    const { regEmail, regName, regPassword } = this.state;
  
    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword
      })
    })
    .then(res => {
      console.log(res.status);
        // Assuming you want to clear the input fields after a successful registration
        window.alert("Registration successful!")
        this.setState({
          regName: '',
          regEmail: '',
          regPassword: ''
        });
  
   
      
    })
    .catch(error => console.error('Error:', error));
  }
  
  


  render() {
    return (
      <article className="signin br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
        <main className="pa4 white-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                <input
                  className="none pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}

                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="none pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailchange}

                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="none b white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswrodChange}

                />  
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => this.submitUser()}
                className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>

          </div>
        </main>
      </article>
    )
  }



}
export default Register;