import { Injectable } from '@angular/core';
import {Staff} from '../shared/staff';
import {STAFFS} from '../shared/staffs';

import {Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Staff[]>{ 
      return of(STAFFS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Staff>{
      return of(STAFFS.filter((staff) => (staff.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Staff>{
      return of(STAFFS.filter((staff) => staff.featured)[0]).pipe(delay(2000));
  }
}
