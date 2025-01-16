import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanStatusService } from '../../services/can-status.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-info-bar',
  standalone: true,
  templateUrl: './info-bar.component.html',
  imports: [CommonModule],
  providers: [CanStatusService]
})
export class InfoBarComponent implements OnInit, OnDestroy {
  status: string = 'Checking...';
  private statusSubscription: Subscription | null = null;

  constructor(private canStatusService: CanStatusService) {}

  ngOnInit(): void {

    this.statusSubscription = interval(5000)
      .pipe(switchMap(() => this.canStatusService.getCanStatus()))
      .subscribe({
        next: (status) => {
          this.status = status === 'connected' ? 'Connected' : 'Disconnected';
        },
        error: () => {
          this.status = 'Disconnected';
        }
      });
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }
}
