import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-create-wish',
  templateUrl: './create-wish.component.html'
})
export class CreateWishComponent implements OnInit {

  private image: number = Math.round(4 * Math.random() + 1);
  private id = 0;

  public wishForm = this.fb.group({
    about: ['', Validators.maxLength(128)],
    price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
  });

  constructor(private fb: FormBuilder,
              private wishListService: WishlistService,
              private router: Router) {}

  ngOnInit() {
    this.wishListService.getCurrentId().subscribe(res => this.id = res);
  }

  onSubmit() {
    const { about, price } = this.wishForm.getRawValue();
    this.wishListService.addWish({ id: this.id, about, price: +price, image: this.image });
    this.router.navigate(['/all']);
  }
}