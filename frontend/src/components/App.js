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
      email: false,
      password: false,
      login: false,
      radius: 1,
      evol: 0,
      growPx: 0.01,
      growEvol: 1,
      evolClick: 1,
      color: "#ffffff"
    };
  }

  changeLogin = (email, 
        password, 
        radius, 
        evol, 
        growPx, 
        growEvol,
        evolClick, 
        color) => {
    let newLogin = !this.state.login
    this.setState({
      login: newLogin,
      email: email,
      password: password,
      radius: radius,
      evol: evol,
      growPx: growPx,
      growEvol: growEvol,
      evolClick: evolClick,
      color: color
    });
    console.log(this.state);
  }

  upgrade = (type, price) => {
    let characteristic = null;
    let info_body = null;

    if (this.state.evol < price) {
      alert("Недостаточно денег!");
      return
    }

    let newCountEvol = parseFloat((this.state.evol - price).toFixed(2));

    switch (type) {
      case "growPx":
        characteristic = this.state.growPx + 0.05;
        characteristic = parseFloat(characteristic.toFixed(2));

        info_body = {
          user_email: this.state.email,
          user_type: "growPx",
          user_newType: characteristic,
          user_evol: newCountEvol
        }

        fetch(`http://127.0.0.1:5000/upgrade`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info_body),
        })
        .then(() => {
          this.setState({
            growPx: characteristic,
            evol: newCountEvol
          })
        })
        .catch(error => console.log('error', error));
        break;

      case "growEvol":
        characteristic = this.state.growEvol + 0.5;
        characteristic = parseFloat(characteristic.toFixed(2));

        info_body = {
          user_email: this.state.email,
          user_type: "growEvol",
          user_newType: characteristic,
          user_evol: newCountEvol
        }

        fetch(`http://127.0.0.1:5000/upgrade`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info_body),
        })
        .then(() => {
          this.setState({
            growEvol: characteristic,
            evol: newCountEvol
          })
        })
        .catch(error => console.log('error', error));
        break;

      case "evolClick":
        characteristic = this.state.evolClick + 1;
        characteristic = parseFloat(characteristic.toFixed(2));

        info_body = {
          user_email: this.state.email,
          user_type: "evolClick",
          user_newType: characteristic,
          user_evol: newCountEvol
        }

        fetch(`http://127.0.0.1:5000/upgrade`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info_body),
        })
        .then(() => {
          this.setState({
            evolClick: characteristic,
            evol: newCountEvol
          })
        })
        .catch(error => console.log('error', error));
        break;

      default:
        console.log("Ошбика");
        break;
    }
  }

  componentWillMount(){
    document.querySelector("body").insertAdjacentHTML('beforeend', "<div class='preloader'><div class='preloader-in'></div></p>");
  }

  componentDidMount(){
    let elem = document.querySelector(".preloader");
    elem.parentNode.removeChild(elem);
  }

  // componentDidUpdate(){
  //   if (this.state.login) {
  //     let info_body = {
  //       user_email: this.state.email,
  //     }
  //     fetch(`http://127.0.0.1:5000/getInfo`, {
  //         method: "POST",
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify(info_body),
  //     })
  //     .then(response => response.text())
  //     .then(result => {
  //         console.log(JSON.parse(result));
  //     })
  //     .catch(error => console.log('error', error));
  //     return false
  //   }
  // }

  click(){
    let addOne = this.state.evol + this.state.evolClick;

    let info_body = {
      user_email: this.state.email,
      user_evol: addOne
    }

    fetch(`http://127.0.0.1:5000/click`, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(info_body),
      })
      .then(() => {
        this.setState({
          evol: addOne
        });
      })
      .catch(error => console.log('error', error));
  }

  changeColor = (color) =>{
    let info_body = {
      user_email: this.state.email,
      user_color: color
    }

    fetch(`http://127.0.0.1:5000/changeColor`, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(info_body),
      })
      .then(() => {
        this.setState({
          color: color
        })
      })
      .catch(error => console.log('error', error));
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
            evolClick = {this.state.evolClick}
          />
          <div className="app-circle">
            <div className="circle" 
              style={{width: this.state.radius, height: this.state.radius, backgroundColor: this.state.color}}
              onClick={()=>this.click()}></div>
          </div>
          <Upgrade 
            color={this.state.color}
            upgrade={this.upgrade}
            growPx = {this.state.growPx}
            growEvol = {this.state.growEvol}
            evolClick = {this.state.evolClick}
            changeColor ={this.changeColor}
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
