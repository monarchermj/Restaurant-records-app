import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  formValue!: FormGroup;

  restaurantModelObj: RestaurantData = new RestaurantData();

  allRestaurantData: any;

  showAdd!: boolean;
  showbtn!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAlldata();
  }

  clickAddResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  addResto() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Restaurant Records Added Successfully!');
        this.formValue.reset();
        this.getAlldata();
      },
      (err) => {
        alert('NOOB');
      }
    );
  }

  getAlldata() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
    });
  }

  deleteResto(data: any) {
    this.api.deleteRestaurant(data.id).subscribe((res) => {
      alert('Restaurant Deleted!');
      this.getAlldata();
    });
  }

  onEditResto(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResto() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api
      .updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id)
      .subscribe((res) => {
        alert('Restaurant Records Updated!');
        this.getAlldata();
      });
  }
}
