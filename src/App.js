import React, { Component } from 'react';
import './App.css';

import Board from './components/Board';

import Scene3 from './assets/screens/screen3.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleType: { backgroundImage: `url(${Scene3})` },
      backgroundType: '',
    }
  }

  handleBackgroundColor = () => { this.setState({ backgroundType: 'Colors' }) };

  handleBackgroundImage = () => { this.setState({ backgroundType: 'Images' }) };

  handleBackgroundChange = (newBackground) => {
    console.log(newBackground);
    let styleType = this.state.backgroundType === 'Colors' ? { backgroundColor: `${newBackground}` } : { backgroundImage: `url(${newBackground})` };
    this.setState({styleType: styleType});
  }

  render() {
    return (
      <div id="App" style={this.state.styleType}>
        <Board id={1}
          handleBackgroundColor={this.handleBackgroundColor}
          handleBackgroundImage={this.handleBackgroundImage}
          handleBackgroundChange={this.handleBackgroundChange}
        />
      </div>

    )
  }
}

export default App;
