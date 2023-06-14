import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private axiosInstance: AxiosInstance;

  token = sessionStorage.getItem("token");
  userID = sessionStorage.getItem("userID");
  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.request.use((config) => {
      config.headers['token'] = this.token;
      config.headers['userID'] = this.userID;
      return config;
    });
  }

  httpOptions = {
    headers: { 'token': this.token,'userID':this.userID }
  };
  headers = new Headers({
    'token': this.token,
    'userID':this.userID
  });
  get(url: string): Observable<any> {
    return new Observable<any>(observer => {
      this.axiosInstance.get(url)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  post(url: string, data: any = null): Observable<any> {
    return new Observable<any>(observer => {
      this.axiosInstance.post(url, data)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

}
