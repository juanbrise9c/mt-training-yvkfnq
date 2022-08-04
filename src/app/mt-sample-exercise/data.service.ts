import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Object> {
    return this.http.get('../../assets/mock-data.json');
  }
}
