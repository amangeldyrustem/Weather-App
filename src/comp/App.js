import React from "react";
import axios from "axios";
import Search from "./Search";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            city: "",
            icon: "",
            description: "",
            feelsLike: 0,
            humidity: 0,
            wind: 0,
            latitude: null,
            longitude: null
        };
    }


    onFormSubmit = async (term) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=59dddac58bc63a8cca720b619560be0d`
        const response = await axios.get(url);
        this.setState({
            temp: response.data.main.temp - 273.15,
            city: response.data.name,
            icon: response.data.weather[0].icon,
            description: response.data.weather[0].main,
            feelsLike: response.data.main.feels_like - 273.15,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
        });
        console.log(response);
    }

    onLocation = async (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=59dddac58bc63a8cca720b619560be0d`
        const response = await axios.get(url);
        this.setState({
            temp: response.data.main.temp - 273.15,
            city: response.data.name,
            icon: response.data.weather[0].icon,
            description: response.data.weather[0].main,
            feelsLike: response.data.main.feels_like - 273.15,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
        });
        console.log(response);
    };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(position => {
            this.onLocation(
                position.coords.latitude,
                position.coords.longitude
            )
        })

    }

    render() {

        return (
            <div className="app">
                <Search onSubmit={this.onFormSubmit} />
                <div className="container">
                    <div className="top">
                        <div className="location">
                            <p>{this.state.city}</p>
                        </div>
                        <div className="temp">
                            <h1>{this.state.temp.toFixed(1)}&#8451;</h1>
                        </div>
                        <div className="description">
                            <p>{this.state.description}</p>
                            {this.state.icon === "" ? null : <img style={{ width: "70px", height: "70px", paddingTop: "10px" }} src={`http://openweathermap.org/img/w/${this.state.icon}.png`} />}
                        </div>
                    </div>


                    <div className="bottom">
                        <div className="feels">
                            <p className="bold">{this.state.feelsLike.toFixed(1)}</p>
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            <p className="bold">{this.state.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            <p className="bold">{this.state.wind} m/s</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;