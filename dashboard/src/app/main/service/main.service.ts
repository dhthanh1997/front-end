import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Weather } from './main';

const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
const params = { q: 'HaNoi', days: 5 };

const headers = {
  'X-RapidAPI-Key': '051c071845msh0b320d3a40ceb06p1a6eedjsnf3e861ebd6e7',
  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
};

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  public getWeather(): Observable<Weather> {
    return this.http.get<Weather>(url, { headers: headers, params: params });
  }

  public getWeatherToPromise(): Promise<Weather> {
    return firstValueFrom(
      this.http.get<Weather>(url, { headers: headers, params })
    );
  }
}
