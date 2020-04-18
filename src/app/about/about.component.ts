import { Component, OnInit, Inject } from '@angular/core';
import {Staff} from '../shared/staff';
import {LeaderService} from '../services/leader.service';
import { flyInOut, expand  } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]

})
export class AboutComponent implements OnInit {

	staffs: Staff[];
	errMess: string;

  constructor(private leaderService: LeaderService,
  			  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
  	this.leaderService.getLeaders().subscribe((staffs) => this.staffs = staffs,
  	errmess => this.errMess = <any>errmess);
  }

}
