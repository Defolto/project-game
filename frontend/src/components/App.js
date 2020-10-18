import React from 'react';
import Info from "./Info";
import Upgrade from "./Upgrade";
import "../css/app.css"
import "../css/general.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: 1,
      evol: 0,
      growPx: 0.01,
      growEvol: 1,
      color: "#ffffff"
    };
  }

  render() {
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
  }
}

export default App;
