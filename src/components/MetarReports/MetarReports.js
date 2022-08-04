import React from 'react';
import { Metar } from '../Metar/Metar.js';
import './MetarReports.css';
import TAF from '../../util/tafapi.js';

export class MetarReports extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        metars: [],
        targetStations: ['CYGK','CYXU','CYYZ'],
        inputStationTerms: 'CYGK CYXU CYYZ'
      }
      this.updateStations = this.updateStations.bind(this);
      this.getMetarReports = this.getMetarReports.bind(this);
      this.handleStationChange = this.handleStationChange.bind(this);
    }
    componentDidMount() {
      this.getMetarReports()
    }
    handleStationChange(event) {
      this.setState({
        inputStationTerms: event.target.value
      })
    }
    getMetarReports() {
      console.log(`getMetarReports() run\ntargetStations: ${this.state.targetStations}`);
      TAF.byStation(this.state.targetStations,'metar').then((response) => {
          const metars = response.data.map((x) => {
              return TAF.parseMetar(x);
          });
          this.setState({
            metars: metars
          });
      })
    }
    updateStations() {
      const targetArray = TAF.parseStations(this.state.inputStationTerms);
      if(targetArray){
        this.setState({
          targetStations: targetArray
        },this.getMetarReports);
      }
    }
    render() {
      return (
        <div className="metarSection">
          <div className="targetStations">
            <h1>Target stations:</h1>
            <div className="targetStationsUI">
              <input id="stationInput" placeholder="CYGK,CYXU,CYYZ" onChange={this.handleStationChange}></input>
              <button onClick={this.updateStations}>change stations</button>
            </div>
          </div>
          <h1 className="sectionTitle">METAR</h1>
          {this.state.metars && this.state.metars.map((metar) => {
            return <Metar
              icao={metar.icao}
              key={metar.icao}
              time={metar.time}
              wind={metar.wind}
              visibility={metar.visibility}
              cloud={metar.cloud}
              temp={metar.temp}
              pressure={metar.pressure}
            />
          })}
        </div>
      );
    }
  }