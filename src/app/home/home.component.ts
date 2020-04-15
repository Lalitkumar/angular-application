import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish'
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion'
import {PromotionService} from '../services/promotion.service';
import {Staff} from '../shared/staff';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	dish: Dish;
	promotion: Promotion;
  staff: Staff;

  constructor(private dishService: DishService, 
  			  private promotionService: PromotionService,
          private leaderService: LeaderService) { }

  ngOnInit() {
  	this.dish = this.dishService.getFeaturedDish();
  	this.promotion = this.promotionService.getFeaturedPromotion();
    this.staff = this.leaderService.getFeaturedLeader();
  }

}