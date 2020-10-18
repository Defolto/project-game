import React from 'react';

class Upgrade extends React.Component {
  render() {
    return (
      <div className="app-upgrade">
        <h2>Улучшения</h2>
        <p>
            Ускорить рост 
            <span>{1} эвол</span>
        </p>
        <p>
            Увеличить Эвол за клик 
            <span>{1} эвол</span>
        </p>
        <p>
            Ускорение эвол в час
            <span>{1} эвол</span>
        </p>
        <div>
            Цвет круга: 
            <input type="color"></input>
        </div>
      </div>
    );
  }
}

export default Upgrade;