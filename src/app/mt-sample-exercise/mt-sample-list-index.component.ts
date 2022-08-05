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
  styleUrls: ['./mt-sample-list-index.component.css'],
})
export class MtSampleListIndexComponent {
  // RXJS
  onDestroy = new Subject<void>();

  // Variables and const
  setError: boolean = false;
  farms: Farm[] = [];
  filter = new FormControl({ value: 'All', disabled: false });
  filters = {
    'Active Date': (data: Farm) => new Date(data.ActiveDate).getFullYear() == 2020,
    'No': (data: Farm) => data.FarmNo.startsWith('100'),
    'All': (data: Farm) => data,
  };

  constructor(
    private _dataService: DataService,
    private _selectedFarmService: SelectedFarmService
  ) {}

  ngOnInit(): void {
    this.setFilterListener();
  }

  setFilterListener(): void {
    this.filter.valueChanges
      .pipe(takeUntil(this.onDestroy), startWith(this.filter.value))
      .subscribe((e) => this.getData());
  }

  getData(setError?: boolean): void {
    this._dataService
      .getData(setError)
      .pipe(
        map((farms: Farm[]) => farms.filter(this.filters[this.filter.value]))
      )
      .subscribe((farms: Farm[]) => {
        console.log('Data: ', farms);
        this.farms = farms;
      });
  }

  setFarm(farm: Farm): void {
    this._selectedFarmService.setFarm(farm);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
