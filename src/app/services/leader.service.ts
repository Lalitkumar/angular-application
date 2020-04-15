import { Injectable } from '@angular/core';
import {Staff} from '../shared/staff';
import {STAFFS} from '../shared/staffs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Staff[]{ 
     return STAFFS;
  }

  getLeader(id: string): Staff{
   	 return STAFFS.filter((staff) => (staff.id === id))[0];
  }

  getFeaturedLeader(): Staff{
  	 return STAFFS.filter((staff) => staff.featured)[0];
  }
}
