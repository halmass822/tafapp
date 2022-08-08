import React from 'react';
import { Metar } from '../Metar/Metar.js';
import './MetarReports.css';
import TAF from '../../util/tafapi.js';
import { Taf } from '../Taf/Taf.js'

export class MetarReports extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        metars: [],
        tafs: [],
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
      TAF.byStation(this.state.targetStations,'metar').then((response) => {
          const metars = response.map((x) => {
              return TAF.parseMetar(x);
          });
          this.setState({
            metars: metars
          });
      });
      TAF.byStation(this.state.targetStations,'taf').then((response) => {
        const tafs = response.map((x) => {
            return TAF.parseTaf(x);
        });
        this.setState({
          tafs: tafs
        });
      });
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
        <div className="app">
          <div className="targetStations">
            <h1>Target stations:</h1>
            <div className="targetStationsUI">
              <input id="stationInput" placeholder="CYGK,CYXU,CYYZ" onChange={this.handleStationChange}></input>
              <button onClick={this.updateStations}>change stations</button>
            </div>
          </div>  
          <div className="metarSection">
            <h1 className="sectionTitle">METAR</h1>
            {this.state.metars && this.state.metars.map((metar) => {
              return <Metar
                icao={metar.icao}
                key={metar.icao}
                time={metar.time}
                timeFrame={metar.timeFrame}
                wind={metar.wind}
                visibility={metar.visibility}
                cloud={metar.cloud}
                temp={metar.temp}
                pressure={metar.pressure}
                weather={metar.weather}
              />
            })}
          </div>
          <div className="tafSection">
            <h1 className="sectionTitle">TAF</h1>
            {this.state.tafs && this.state.tafs.map((taf) => {
              return <Taf
                icao={taf.icao}
                key={taf.icao}
                forecastTime={taf.forecastTime}
                forecasts={taf.forecasts}
                forecastRemarks={taf.forecastRemarks}
              />
            })}
          </div>
        </div>
      );
    }
  }