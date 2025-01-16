import { Injectable } from '@angular/core';
import { Log } from '../models/log.models';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly MAX_LOGS = 30;
  logs: Log[] = [];
  private lastConnectionState: 'connected' | 'connecting' | 'error' | null = null;
  
  addLog(type: 'error' | 'warning' | 'success', message: string) {
    if(type==='error')
      return
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ timestamp, type, message });

    
    if (this.logs.length > this.MAX_LOGS) {
        
      this.logs.shift(); 
    }
  }

  getLogs(): Log[] {
    return this.logs;
    
  }
  checkConnection(isConnected: boolean | null) {
    if (isConnected === true && this.lastConnectionState !== 'connected') {
      this.addLog('success', 'Device connected');
      this.lastConnectionState = 'connected';
    } else if (isConnected === false && this.lastConnectionState !== 'connecting') {
      this.addLog('warning', 'Attempting to connect...');
      this.lastConnectionState = 'connecting';
    } else if (isConnected === null && this.lastConnectionState !== 'error') {
      this.addLog('error', 'Device connection failed');
      this.lastConnectionState = 'error';
    }
  }
}
