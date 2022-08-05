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
  farm: Farm = {
    ActiveDate: new Date('2018-03-05T00:00:00'),
    Address: 'FARM ADDRESS DEMO',
    FarmName: 'FARM NAME 2020000',
    FarmNo: '100FFM2020000',
    Id: 1,
  };

  constructor() {}
}
