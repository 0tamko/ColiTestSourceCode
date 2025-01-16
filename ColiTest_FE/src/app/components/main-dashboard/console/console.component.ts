import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../services/log.service';
import { Log } from '../../../models/log.models';
import { FormsModule } from '@angular/forms';
import { Command } from '../../../models/command.model';
import { SliderService } from '../../../services/slider.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SliderService]
})
export class ConsoleComponent implements OnInit {
  logs: Log[] = [];

  query: string="send>6022>04>1200";

  constructor(private logService: LogService, private sliderService: SliderService) {}

  ngOnInit(): void {
    this.logs = this.logService.getLogs();
  }

  //Known command is for now "send", to manipulate data by query.
  //TODO: prototype
  parseQuery() : void{
    const splitedCommand : string[] = this.query.split(">")

    console.log(splitedCommand)

    if(splitedCommand[0] == "send")
    {
      splitedCommand.shift()

      const prepareCommandToSend : Command = {
        command: {
          node_id: 64,
          index: splitedCommand[0],
          subindex: splitedCommand[1],
          data: splitedCommand[2] as unknown as number,
          type: 'write',
          data_type: splitedCommand[3],
        }
      }
      
      this.sliderService.sendCommand(prepareCommandToSend).subscribe({
        next: (response) => {
          console.log('Successfully sent', response);
          // this.logService.addLog(
          //   'success',
          //   `Command updated successfully. Command: ${JSON.stringify(prepareCommandToSend.command)}`
          // );
        },
        error: (err) => {
          console.error('Error sending command', err);
          this.logService.addLog(
            'error',
            `Failed to update slider ${prepareCommandToSend.command.index} to ${prepareCommandToSend.command.data}. Error: ${err.message}`
          );
        },
        complete : () => this.query = "",
      });

    }else{
      const time = new Date().toUTCString()
      const newLog: Log = {
                            timestamp : time.toString(),
                            message: " - "+splitedCommand[0]+" unknown command or function",
                            type: "error"}
      this.logs.push(newLog)
    }
  }

}
