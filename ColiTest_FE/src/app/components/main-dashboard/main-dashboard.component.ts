import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsoleComponent } from './console/console.component';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { SliderService } from '../../services/slider.service';
import { LogService } from '../../services/log.service';
import { EdsService } from '../../services/eds.service';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ConsoleComponent, TreeNodeComponent],
  providers: [SliderService, EdsService],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit {
  value = 50;
  value2 = 50;
  edsData: any = null;
  isTreeExpanded: boolean = true;
  
  constructor(
    private sliderService: SliderService,
    private logService: LogService,
    private edsService: EdsService,
  ) {}

  ngOnInit(): void {
    this.fetchEdsData();
  }

  fetchEdsData(): void {
    this.edsService.getEdsData().subscribe({
      next: (data) => {
        this.edsData = data;
      },
      error: (error: any) => {
        console.error('Error fetching EDS data:', error);
      }
    });
  }
  

  onSliderChange(sliderId: string, value: number): void {
    let commandToSend: any;


    if (sliderId === 'Bottom_X_Axis') {
        commandToSend = {
            command: {
                node_id: 64,
                index: '6010', 
                subindex: '04', 
                data: value,
                type: 'write',
                data_type: '0x0003'
            }
        };
    } else if (sliderId === 'Right_Y_Axis') {
        commandToSend = {
            command: {
                node_id: 64,
                index: '6010', 
                subindex: '14', 
                data: value,
                type: 'write',
                data_type: '0x0003'
            }
        };
    } else {
        console.error('Unknown slider ID:', sliderId);
        this.logService.addLog('error', `Unknown slider ID: ${sliderId}`);
        return;
    }

    this.logService.addLog('success', `Slider ${sliderId}: Command is being sent with value ${value}`);

    this.sliderService.sendCommand(commandToSend).subscribe({
        next: (response) => {
            console.log('Successfully sent', response);
            this.logService.addLog(
                'success',
                `Slider ${sliderId} updated successfully. Command: ${JSON.stringify(commandToSend.command)}`
            );
        },
        error: (err) => {
            console.error('Error sending command', err);
            this.logService.addLog(
                'error',
                `Failed to update slider ${sliderId} to ${value}. Error: ${err.message}`
            );
        }
    });
}

  toggleTree(): void {
    this.isTreeExpanded = !this.isTreeExpanded;
  }

  mapValue(value: number, min: number = -1374, max: number = 2500, newMin: number = 20, newMax: number = 125): number {
    // Overenie, že rozsah nie je nulový
    if (min === max) {
        throw new Error("Min and max cannot be same.");
    }

    return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
}


  colimatorSvgEventListener(event: any): void{
    const valuePosition = event.target.value
    const svgObject = document.getElementById('colimatorSvg');
    const svgDoc = svgObject as HTMLObjectElement
    console.log(event.target.id)

    if(event.target.id == "bottom_slider"){
      // svgDoc.contentDocument!.getElementById("shutter_top")?.setAttribute("height",""+this.mapValue(valuePosition));
      //svgDoc.contentDocument!.getElementById("shutter_bottom")?.setAttribute("height",""+this.mapValue(valuePosition));
      
    }
    else
    {
      // svgDoc.contentDocument!.getElementById("shutter_right")?.setAttribute("height",""+this.mapValue(valuePosition));
      //svgDoc.contentDocument!.getElementById("shutter_left")?.setAttribute("height",""+this.mapValue(valuePosition));
    }
  }
  invertSliderValue(value: number): number {
    const min = -1374;
    const max = 2500;  
    return max + min - value; 
  }
  
}
