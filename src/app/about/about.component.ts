import { Component, OnInit } from '@angular/core';
import {Staff} from '../shared/staff';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	staffs: Staff[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
  	this.staffs = this.leaderService.getLeaders();
  }

}
