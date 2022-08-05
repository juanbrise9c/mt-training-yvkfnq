import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectedFarmService } from './selected-farm.service';
import { takeUntil } from 'rxjs/operators';
import { Farm } from './farm';
import {
  EditService,
  ToolbarService,
  SortService,
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'mt-sample-detail',
  templateUrl: './mt-sample-detail.component.html',
  styleUrls: ['mt-sample-detail.component.css'],
})
export class MtSampleDetailComponent {
  // RXJS
  onDestroy = new Subject<void>();

  farm: Farm;

  constructor(private _selectedFarmService: SelectedFarmService) {}

  ngOnInit() {
    this._selectedFarmService.currentFarm
      .pipe(takeUntil(this.onDestroy))
      .subscribe((currentFarm: Farm) => {
        this.farm = currentFarm;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
