import { Component } from '@angular/core';
import { DataService } from './data.service';
import { SelectedFarmService } from './selected-farm.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Farm } from './farm';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mt-sample-list',
  templateUrl: './mt-sample-list-index.component.html',
})
export class MtSampleListIndexComponent {
  // RXJS
  onDestroy = new Subject<void>();

  // Variables and const
  farms = [];
  filter = new FormControl({ value: 'All', disabled: false });
  filters = {
    'Active Date': (data: Farm) =>
      new Date(data.ActiveDate).getFullYear() == 2020,
    No: (data: Farm) => data.FarmNo.startsWith('100'),
    All: (data: Farm) => data,
  };

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.setFilterListener();
  }

  setFilterListener(): void {
    this.filter.valueChanges
      .pipe(takeUntil(this.onDestroy), startWith(this.filter.value))
      .subscribe((e) => this.getData());
  }

  getData(): void {
    this._dataService
      .getData()
      .pipe(
        map((farms: Farm[]) => farms.filter(this.filters[this.filter.value]))
      )
      .subscribe((farms: Farm[]) => {
        console.log('Data: ', farms);
        this.farms = farms;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
