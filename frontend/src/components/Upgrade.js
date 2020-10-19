import React from 'react';

class Upgrade extends React.Component {

  render() {
    return (
      <div className="app-upgrade">
        <h2>Улучшения</h2>
        <div className="app-upgrade__block" onClick={()=>this.props.upgrade("growPx", parseFloat((this.props.growPx / 100 * 800).toFixed(2)))}>
            Ускорить рост на 0.05
            <span>{parseFloat((this.props.growPx / 100 * 800).toFixed(2))} эвол</span>
            <div className="wrapper"></div>
        </div>
        <div className="app-upgrade__block" onClick={()=>this.props.upgrade("evolClick", parseFloat((this.props.evolClick / 100 * 70).toFixed(2)))}>
            Увеличить Эвол за клик на 1
            <span>{parseFloat((this.props.evolClick / 100 * 70).toFixed(2))} эвол</span>
            <div className="wrapper"></div>
        </div>
        <div className="app-upgrade__block" onClick={()=>this.props.upgrade("growEvol", parseFloat((this.props.growEvol / 100 * 400).toFixed(2)))}>
            Ускорение эвол в час 0.5
            <span>{parseFloat((this.props.growEvol / 100 * 400).toFixed(2))} эвол</span>
            <div className="wrapper"></div>
        </div>
        <div>
            Цвет круга: 
            <input id="color" type="color" onChange={()=>this.props.changeColor(document.querySelector("#color").value)}></input>
        </div>
      </div>
    );
  }
}

export default Upgrade;