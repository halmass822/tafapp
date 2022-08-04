import React from 'react';
import './Metar.css';
import airport from '../../tafappimg/airport.png';
import binoculars from '../../tafappimg/binoculars.png';
import clock from '../../tafappimg/clock.png';
import cloud from '../../tafappimg/cloud.png';
import pressure from '../../tafappimg/pressure.png';
import temp from '../../tafappimg/temp.png';
import wind from '../../tafappimg/wind.png';

export class Metar extends React.Component {
    render() {
        return <div className="metarReport">
            <h2><img src={airport} className="metarLogo" alt="airport logo"></img>{this.props.icao}</h2>
            <h2><img src={clock} className="metarLogo" alt="clock logo"></img>{this.props.time}</h2>
            <h2><img src={wind} className="metarLogo" alt="wind logo"></img>{this.props.wind}</h2>
            <h2><img src={binoculars} className="metarLogo" alt="binoculars logo"></img>{this.props.visibility}</h2>
            <h2><img src={cloud} className="metarLogo" alt="cloud logo"></img>{this.props.cloud}</h2>
            <h2><img src={temp} className="metarLogo" alt="temp logo"></img>{this.props.temp}</h2>
            <h2><img src={pressure} className="metarLogo" alt="pressure logo"></img>{this.props.pressure}</h2>
        </div>
    }
}

{/* */}