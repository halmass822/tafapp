import './App.css';
import { Metar } from './components/Metar/Metar.js';
import React from 'react';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      metars: []
    }
  }
  render(){
    return (
      <div className="App">
        <MetarReports />
      </div>
    );
  }
}

export default App;