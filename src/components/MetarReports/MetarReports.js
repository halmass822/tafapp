import React from 'react';
import { Metar } from '../Metar/Metar.js';
import './MetarReports.css';
import TAF from '../../util/tafapi.js';

export class MetarReports extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        metars: []
      }
    }
    componentDidMount() {
        TAF.byStation(['CYGK','CYXU','CYYZ'],'metar').then((response) => {
            console.log(response);
            const metars = response.data.map((x) => {
                return TAF.parseMetar(x);
            });
            this.setState({
                metars: metars
            });
        })
    }
    render() {
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