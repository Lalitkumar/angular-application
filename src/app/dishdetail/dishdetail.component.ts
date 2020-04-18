import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import {Comment} from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;


  dishDetailForm: FormGroup;
  comment: Comment;
  newComment: Comment;
  userComment: Comment;


  cmtFormErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comments are required.',
      'minlength':     'Comments must be at least 2 characters long.',
      'maxlength':     'Comments cannot be more than 25 characters long.'
    },
  };

@ViewChild('fform') dishDetailFormDirective;

  constructor(private dishService: DishService, 
  			  private route: ActivatedRoute,
  			  private location: Location,
          private formBuilder: FormBuilder,
          @Inject('BaseURL') private BaseURL) {
            this.createForm();

           }

   createForm(){
    this.dishDetailForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: '0',
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });

    this.dishDetailForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

   ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }, 
      errmess => this.errMess = <any>errmess);
  }


  goBack():void {
  	this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  onValueChanged(data?: any) {
    if (!this.dishDetailForm) { return; }
    const form = this.dishDetailForm;
    for (const field in this.cmtFormErrors) {
      if (this.cmtFormErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.cmtFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.cmtFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit()
  {
    this.dishDetailForm = this.dishDetailForm.value;
    this.userComment.date = new Date().toISOString();

    this.newComment = this.userComment;
    this.dish.comments.push(this.newComment);

    this.dishDetailForm.reset({
      author: '',
      rating: 0,
      comment: ''
    });

  }


}
