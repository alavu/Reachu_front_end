// import {Component, OnInit} from '@angular/core';
// import {SubcategoryService} from "../../../services/subcategory-service.service";
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {ActivatedRoute, Router} from "@angular/router";
// import {MatSnackBar} from "@angular/material/snack-bar";

// @Component({
//   selector: 'app-subcategory-component',
//   templateUrl: './subcategory-component.component.html',
//   styleUrls: ['./subcategory-component.component.scss']
// })
// export class SubcategoryComponent implements OnInit {

//     subcategoryForm!: FormGroup;
//     categoryId!: number;

//     constructor(
//         private fb: FormBuilder,
//         private router: Router,
//         private snackBar: MatSnackBar,
//         private subcategoryService: SubcategoryService,
//         private route: ActivatedRoute
//     ) { }

//     ngOnInit(): void {
//         this.route.params.subscribe(params => {
//             this.categoryId = params['categoryId'];
//         });

//         this.subcategoryForm = this.fb.group({
//             name: [null, [Validators.required]],
//             description: [null, [Validators.required]],
//             categoryId: [this.categoryId, [Validators.required]]
//         });
//     }

//     addSubcategory(): void {
//         if (this.subcategoryForm.valid) {
//             this.subcategoryService.createSubcategory(this.subcategoryForm.value).subscribe((res) => {
//                 this.snackBar.open('Subcategory Posted Successfully!', 'Close', {
//                     duration: 5000
//                 });
//                 this.router.navigateByUrl('/company/dashboard');
//             }, err => {
//                 this.snackBar.open('Error posting subcategory', 'Close', {
//                     duration: 5000,
//                     panelClass: 'error-snackbar'
//                 });
//             });
//         } else {
//             this.subcategoryForm.markAllAsTouched();
//         }
//     }

// }
