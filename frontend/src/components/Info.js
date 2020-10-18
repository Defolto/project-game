import React from 'react';

class Info extends React.Component {
  render() {
    return (
      <div className="app-info">
        <h2>Информация</h2>
        <p><span>Радиус:</span> {this.props.radius}</p>
        <p><span>Эвол:</span> {this.props.evol}</p>
        <p><span>Рост:</span> {this.props.growPx} px/час</p>
        <p><span>Добыча:</span> {this.props.growEvol} эвол/час</p>
      </div>
    );
  }
}

export default Info;