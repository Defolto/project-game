import React from 'react';
import Info from "./Info";
import Upgrade from "./Upgrade";
import Login from "./Login";
import "../css/app.css"
import "../css/general.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      radius: 1,
      evol: 0,
      growPx: 0.01,
      growEvol: 1,
      color: "#ffffff"
    };
  }

  changeLogin = () => {
    let newLogin = !this.state.login
    this.setState({
      login: newLogin
    });
  }

  componentWillMount(){
    document.querySelector("body").insertAdjacentHTML('beforeend', "<div class='preloader'><div class='preloader-in'></div></p>");
  }

  componentDidMount(){
    let elem = document.querySelector(".preloader");
    elem.parentNode.removeChild(elem);
  }

  render() {
    if (this.state.login) {
      return (
        <div className="app">
          <Info 
            radius = {this.state.radius}
            evol = {this.state.evol}
            growPx = {this.state.growPx}
            growEvol = {this.state.growEvol}
          />
          <div className="app-circle">
            <div className="circle">
              <div className="circle-shadow"></div>
            </div>
          </div>
          <Upgrade 
            color={this.state.color}
          />
        </div>
      );
    } else {
      return (
        <Login
          login={this.changeLogin}
        />
      );
    }
  }
}

export default App;
