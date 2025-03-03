// weather-app.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css']
})
export class WeatherAppComponent implements OnInit {
  cityName: string = 'Jaipur';
  weatherData: any;
  iconUrl: string = '';
  currentDate: string = '';
  loading: boolean = false;
  error: string = '';
  theme: string = 'light-theme';

  private url = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.loading = true;
    this.error = '';
    const fullUrl = `${this.url}?q=${this.cityName}&appid=${this.apiKey}&units=metric`;
    this.http.get(fullUrl).subscribe(
      (data: any) => {
        this.weatherData = data;
        this.iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        this.currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        document.getElementById('weather-info')?.style.setProperty('display', 'block');
        this.loading = false;
      },
      (error) => {
        this.error = 'City not found. Please try again.';
        this.loading = false;
        console.error('Error fetching weather data:', error);
      }
    );
  }

  clear() {
    this.weatherData = null;
  }
  
  setTheme(mode: string) {
    this.theme = mode === 'dark' ? 'dark-theme' : 'light-theme';
  }
}
