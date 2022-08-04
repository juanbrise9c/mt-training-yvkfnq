import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData(setError?: boolean): Observable<Object> {
    const url = !setError ? '../../assets/mock-data.json' : 'WRONG URL';
    return this.http.get(url);
  }
}
