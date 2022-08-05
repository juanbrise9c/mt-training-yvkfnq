import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Farm } from './farm';

@Injectable()
export class SelectedFarmService {
  private currentFarmSubject: BehaviorSubject<Farm> = new BehaviorSubject(null as Farm);
  public readonly currentFarm: Observable<Farm> = this.currentFarmSubject.asObservable();

  constructor(private http: HttpClient) {}

  setFarm(farm: Farm): void {
    this.currentFarmSubject.next(farm);
  }
}
