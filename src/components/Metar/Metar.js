import React from 'react';
import './Metar.css';
import airport from '../../tafappimg/airport.png';
import binoculars from '../../tafappimg/binoculars.png';
import clock from '../../tafappimg/clock.png';
import cloud from '../../tafappimg/cloud.png';
import pressure from '../../tafappimg/pressure.png';
import temp from '../../tafappimg/temp.png';
import wind from '../../tafappimg/wind.png';
import weather from '../../tafappimg/weather.png';

export class Metar extends React.Component {
    render() {
        return <div className="metarReport">
            {this.props.icao && <h2 className="airport"><img src={airport} className="metarLogo" alt="airport logo"></img>{this.props.icao}</h2>}
            {this.props.time && <h2 className="clock"><img src={clock} className="metarLogo" alt="clock logo"></img>{this.props.time}</h2>}
            {this.props.wind && <h2 className="wind"><img src={wind} className="metarLogo" alt="wind logo"></img>{this.props.wind}</h2>}
            {this.props.visibility && <h2 className="visibility"><img src={binoculars} className="metarLogo" alt="binoculars logo"></img>{this.props.visibility}</h2>}
            {this.props.temp && <h2 className="temp"><img src={temp} className="metarLogo" alt="temp logo"></img>{this.props.temp}</h2>}
            {this.props.pressure && <h2 className="pressure"><img src={pressure} className="metarLogo" alt="pressure logo"></img>{this.props.pressure}</h2>}
            {this.props.cloud && <h2 className="cloud"><img src={cloud} className="metarLogo" alt="cloud logo"></img>{this.props.cloud}</h2>}
            {this.props.weather && <h2 className="weather"><img src={weather} className="metarLogo" alt="weather logo"></img>{this.props.weather}</h2>}            
        </div>
    }
}