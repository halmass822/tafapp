import './App.css';
import React from 'react';
import { MetarReports } from './components/MetarReports/MetarReports';

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