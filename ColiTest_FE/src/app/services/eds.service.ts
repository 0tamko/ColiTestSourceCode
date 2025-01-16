import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdsService {
  private readonly baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getEdsData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/canopen/indexes`);
  }
}
