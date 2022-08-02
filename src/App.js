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
        <div className="metarSection">
          <h1 className="sectionTitle">METAR</h1>
          {this.state.metars && this.state.metars.map((metar) => {
            return <Metar
              place={metar.place}
              icao={metar.icao}
              time={metar.time}
              wind={metar.wind}
              visibility={metar.visibility}
              cloud={metar.cloud}
              temp={metar.temp}
              pressure={metar.pressure}
            />
          })}
        </div>
      </div>
    );
  }
}

export default App;