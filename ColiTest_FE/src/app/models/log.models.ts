export interface Log {
    timestamp: string;
    type: 'error' | 'warning' | 'success';
    message: string;
  }
   