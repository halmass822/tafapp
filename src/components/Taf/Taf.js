import React from 'react';
import './Taf.css';
import airport from '../../tafappimg/airport.png';
import binoculars from '../../tafappimg/binoculars.png';
import clock from '../../tafappimg/clock.png';
import cloud from '../../tafappimg/cloud.png';
import temp from '../../tafappimg/temp.png';
import wind from '../../tafappimg/wind.png';
import weather from '../../tafappimg/weather.png';

export class Taf extends React.Component {
    render() {
        let forecastKeyCounter = 0;
        return <div className="tafReport">
            <div className="tafHeader">
                {this.props.icao && <h2 className="airport">
                    <img src={airport} className="metarLogo" alt="airport logo"></img>
                    {this.props.icao}
                    </h2>}
                {this.props.forecastTime && <h2 className="clock">
                    <img src={clock} className="metarLogo" alt="clock logo"></img>
                    {this.props.forecastTime}
                    </h2>}
            </div>
            <div className="forecastSection">
                <div className="initialForecast">
                {this.props.forecasts[0].tafTime && <h2 className="tafTime">
                    <img src={clock} className="metarLogo" alt="clock logo"></img>
                    {this.props.forecasts[0].tafTime}
                    </h2>}
                {this.props.forecasts[0].wind && <h2 className="wind">
                    <img src={wind} className="metarLogo" alt="wind logo"></img>
                    {this.props.forecasts[0].wind}
                    </h2>}
                {this.props.forecasts[0].visibility && <h2 className="visibility">
                    <img src={binoculars} className="metarLogo" alt="binoculars logo"></img>
                    {this.props.forecasts[0].visibility}
                    </h2>}
                {this.props.forecasts[0].temp && <h2 className="temp">
                    <img src={temp} className="metarLogo" alt="temp logo"></img>
                    {this.props.forecasts[0].temp}
                    </h2>}
                {this.props.forecasts[0].cloud && <h2 className="cloud">
                    <img src={cloud} className="metarLogo" alt="cloud logo"></img>
                    {this.props.forecasts[0].cloud}
                    </h2>}
                </div>
            {this.props.forecasts.slice(1).map((forecast) => {
                forecastKeyCounter += 1
                return <div className="forecast" key={forecastKeyCounter}>
                    {forecast.forecastPrepend && <h2 className="prepend">{forecast.forecastPrepend}</h2>}
                    {forecast.tafTime && <h2 className="tafTime">
                        <img src={clock} className="metarLogo" alt="clock logo"></img>
                        {forecast.tafTime}
                        </h2>}
                    {forecast.wind && <h2 className="wind">
                        <img src={wind} className="metarLogo" alt="wind logo"></img>
                        {forecast.wind}
                        </h2>}
                    {forecast.visibility && <h2 className="visibility">
                        <img src={binoculars} className="metarLogo" alt="binoculars logo"></img>
                        {forecast.visibility}
                        </h2>}
                    {forecast.cloud && <h2 className="cloud">
                        <img src={cloud} className="metarLogo" alt="cloud logo"></img>
                        {forecast.cloud}
                        </h2>}
                    {forecast.weather && <h2 className="weather">
                        <img src={weather} className="metarLogo" alt="weather logo"></img>
                        {forecast.weather}
                        </h2>}
                </div>
            })}
            </div>
            {this.props.forecastRemarks && <h2 className="remarks">{this.props.forecastRemarks}</h2>}
        </div>
    }
}