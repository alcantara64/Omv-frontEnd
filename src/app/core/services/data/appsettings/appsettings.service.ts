import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppSettings } from '../../../models/IAppSettings';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {

  private appSettings: IAppSettings;

  constructor(private httpClient: HttpClient) {
    this.appSettings = this.loadSettings();
  }

  getAppSettingsAsync(): Observable<IAppSettings> {
    return this.httpClient.get<IAppSettings>('../assets/appsettings.json');
  }

  getAppSettings(): IAppSettings {
    return this.appSettings;
  }

  public getBaseAPIUrl(): string {
    if (this.appSettings.InDevMode === '1') {
      return this.appSettings.DEV_API_URL;
    }
    if (this.appSettings.InTestMode === '1'){
      return this.appSettings.TEST_API_URL;
    }
    return this.appSettings.PROD_API_URL;
  }

  public getBaseUrl(){
    if (this.appSettings.InDevMode === '1') {
      return this.appSettings.URL;
    }
    if (this.appSettings.InTestMode === '1'){
      return this.appSettings.TEST_URL;
    }
    return this.appSettings.PROD_URL;
  }

  private loadSettings(){
    let response = '';
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(evt){
        if (this.readyState === 4 && this.status === 200 ){
          response = this.responseText;
        }
    };
    xhr.open('GET', '../assets/appsettings.json', false);
    xhr.send(null);
    return JSON.parse(response) as IAppSettings;
  }
}