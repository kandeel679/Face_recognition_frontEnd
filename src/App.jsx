import React, { Component } from "react";
import Nav from "./components/Navigation/Navigation";
import Imglink from "./components/Imglink/Imglink";
import ParticlesBg from 'particles-bg'
import FaceRecognitoin from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import "./App.css";


///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////
const setupclarifi = (iamgeUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '76fa7b82e98f4db2843a566fb938ea31';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = '299792458';
  const APP_ID = 'faceRe';
  // Change these to whatever model and image URL you want to use
  // const MODEL_ID = 'face-detection';
  // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
  const IMAGE_URL = iamgeUrl;

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions

}



class App extends Component {
  constructor() {
    super();
    this.state = {

      input: "",
      imageUrl: "",
      box: {},
      description: "",
      route: "signin",
      isSignin: this.route === "home",
      user: {
        id: '',
        name: '',
        email: '',
        password: ''
      }

    }
  }
  setUser = (data) => {
    //data is an array that contain the users info , id(0) -> name(1) -> email (2) -> password(3) 
    this.setState({
      user: {
        id: data[0],
        name: data[1],
        email: data[2],
        password: data[3]
      }
    })
  }
  calcFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displaybox = (box) => {
    this.setState({ box: box })
  }
  oninputChnage = (event) => {
    this.setState({ input: event.target.value });
  }

  FaceRecognitoinRequest = () => {
    const apiUrl = "https://api.clarifai.com/v2/models/face-detection/outputs";
    const requestOptions = setupclarifi(this.state.input);
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(result => this.displaybox(this.calcFaceLocation(result)))
      .catch(error => console.log('error', error));
  }

  imageCaption = () => {
    const apiUrl = "https://api.clarifai.com/v2/models/general-english-image-caption-clip/outputs";
    const requestOptions = setupclarifi(this.state.input);
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => this.setState({ description: res.outputs[0].data.text.raw }))
      .catch(error => console.log('error', error));

  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    this.FaceRecognitoinRequest();
    this.imageCaption();

  }
  restartdata =() =>{
    this.setState({ user: {
      id: '',
      name: '',
      email: '',
      password: ''
    }})
  }
  onRouteChnage = (route) => {
    this.setState({
      route: route
    });
  }

  render() {
    return (
      <div className="App">
        <Nav onRouteChnage={this.onRouteChnage} restartdata={this.restartdata} />
        <div>...</div>
        <ParticlesBg color="#bbbbbb" num={200} type="cobweb" bg={true} />
        {this.state.route === 'signin' ? (
          <Signin setUser={this.setUser} onRouteChnage={this.onRouteChnage} />
        ) : this.state.route === 'register' ? (<Register onRouteChnage={this.onRouteChnage} />) :this.state.route === "profile"? 
        (<Profile user ={this.state.user} onRouteChnage={this.onRouteChnage}/>):
        (
          <>
            <Imglink oninputChnage={this.oninputChnage} onSubmit={this.onSubmit} description={this.state.description} />
            <FaceRecognitoin box={this.state.box} imgUrl={this.state.imageUrl} />
          </>
        )}
      </div>
    );
  }
}
export default App;

