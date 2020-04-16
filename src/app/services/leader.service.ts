import { Injectable } from '@angular/core';
import {Staff} from '../shared/staff';
import {STAFFS} from '../shared/staffs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Staff[]>{ 
      return new Promise(resolve =>{
        setTimeout(() => resolve(STAFFS), 2000);
      });
  }

  getLeader(id: string): Promise<Staff>{
      return new Promise(resolve => {
        setTimeout(() => resolve(STAFFS.filter((staff) => (staff.id === id))[0]), 2000);
      });
  }

  getFeaturedLeader(): Promise<Staff>{
      return new Promise(resolve => {
        setTimeout(() => resolve(STAFFS.filter((staff) => staff.featured)[0]), 2000);
      });
  }
}
