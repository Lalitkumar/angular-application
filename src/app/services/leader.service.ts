import { Injectable } from '@angular/core';
import {Staff} from '../shared/staff';
import {STAFFS} from '../shared/staffs';

import {Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgServiceService } from './process-httpmsg-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgServiceService) { }

  getLeaders(): Observable<Staff[]>{ 
       return this.http.get<Staff[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Staff>{
      return this.http.get<Staff>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Staff>{
      return this.http.get<Staff[]>(baseURL + 'leadership?featured=true').pipe(map(staffs => staffs[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
