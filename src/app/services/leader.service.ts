import { Injectable } from '@angular/core';
import {Staff} from '../shared/staff';
import {STAFFS} from '../shared/staffs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Staff[]>{ 
     return Promise.resolve(STAFFS);
  }

  getLeader(id: string): Promise<Staff>{
   	 return Promise.resolve(STAFFS.filter((staff) => (staff.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Staff>{
  	 return Promise.resolve(STAFFS.filter((staff) => staff.featured)[0]);
  }
}
