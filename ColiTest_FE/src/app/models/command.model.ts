 export interface Command {
   command: Body;
 } 

 interface Body{
      node_id: number;
      index: string;
      subindex: string;
      data: number;
      type: string;
      data_type: string;  
 }