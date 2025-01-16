import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanStatusService {
  private readonly baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getCanStatus(): Observable<string> {
    return this.http.get<{ status: string }>(`${this.baseUrl}/network/can-status`).pipe(
      map((response) => response.status), // Extract the `status`
      catchError(() => of('Disconnected')) // Handle errors
    );
  }
}
