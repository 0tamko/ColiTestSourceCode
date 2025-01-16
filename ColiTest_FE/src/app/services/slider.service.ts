import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private backendUrl = 'http://127.0.0.1:5000/network/send-command'; 

  constructor(private http: HttpClient) {}

  sendCommand(command: any): Observable<any> {
    console.log('Sending command to backend:', command);
    return this.http.post(this.backendUrl, command);
  }
}
