import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { store } from '@angular/core/src/render3';

const configKey = 'appconfig';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  config: object;
  http: HttpClient;

  constructor(handler: HttpBackend) {
    //ignore http interceptor call
    this.http = new HttpClient(handler);
    
    const savedConfig = sessionStorage.getItem(configKey);
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
    }
  }

  get(key: any) {
    return this.config[key];
  }

  public setConfig(){
    this.config =  this.http.get("./AppConfig.json");
    sessionStorage.setItem(configKey, JSON.stringify(this.config));
  }

}
