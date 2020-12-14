import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css']
})
export class AssetFormComponent implements OnInit {
  assetForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.assetForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      count: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.assetForm.controls; }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.assetForm.invalid) {
        return;
    }
  }
}
