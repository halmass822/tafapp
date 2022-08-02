import React from 'react';
import './Metar.css';

export class Metar extends React.Component {
    render() {
        return <div className="metarReport">
            <div className="metarLine1">
                <h2>{this.props.place}</h2>
                <h2>{this.props.icao}</h2>
                <h2>{this.props.time}</h2>
                <h2>{this.props.wind}</h2>
                <h2>{this.props.visibility}</h2>
            </div>
            <div className="metarLine2">
                <h2>{this.props.cloud}</h2>
                <h2>{this.props.temp}</h2>
                <h2>{this.props.pressure}</h2>
            </div>
        </div>
    }
}