// import {Component, OnInit} from '@angular/core';
// import {ReservationDTO} from "../../model/ReservationDTO";
// import {ClientService} from "../../client/services/client.service";
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {UserStorageService} from "../../auth/services/user-stoarge.service";
//
// @Component({
//     selector: 'app-booked-customer',
//     templateUrl: './booked-customer.component.html',
//     styleUrls: ['./booked-customer.component.scss']
// })
// export class BookedCustomerComponent implements OnInit {
//
//     bookings: ReservationDTO[] = [];
//     statusForm: FormGroup;
//     partnerId: any;
//
//     constructor(private clientService: ClientService, private fb: FormBuilder) { }
//
//     ngOnInit() {
//         this.partnerId = UserStorageService.getUserId();
//         this.fetchBookedCustomers();
//
//         // Initialize the form with default values
//         this.statusForm = this.fb.group({
//             jobStatus: ['', Validators.required],  // Status is required
//             startDate: [''],   // Start date can be empty initially
//             endDate: [''],     // End date can be empty initially
//         });
//     }
//
//     fetchBookedCustomers(): void {
//         this.clientService.getBookingCustomers().subscribe(
//             (data: ReservationDTO[]) => {
//                 this.bookings = data;
//                 console.log("Booked customer data", this.bookings);
//             },
//             (error) => {
//                 console.error('Error fetching booked customers:', error);
//             }
//         );
//     }
//
//     updateStatus(): void {
//         const statusUpdate = this.statusForm.value;
//         console.log('Selected status:', statusUpdate);
//         console.log('Partner id:', this.partnerId);
//
//         // Make sure the status is selected before sending the update request
//         if (!statusUpdate.jobStatus) {
//             console.error('Please select a status');
//             return;
//         }
//
//         this.clientService.updatePartnerJobStatus(this.partnerId, statusUpdate).subscribe(
//             (response) => {
//                 console.log("Job status updated successfully:", response);
//                 this.fetchBookedCustomers();  // Refresh the bookings after updating the status
//             },
//             (error) => {
//                 console.error("Error updating job status:", error);
//             }
//         );
//     }
// }

// import { Component, OnInit } from '@angular/core';
// import { ReservationDTO } from "../../model/ReservationDTO";
// import { ClientService } from "../../client/services/client.service";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { UserStorageService } from "../../auth/services/user-stoarge.service";
//
// @Component({
//     selector: 'app-booked-customer',
//     templateUrl: './booked-customer.component.html',
//     styleUrls: ['./booked-customer.component.scss']
// })
// export class BookedCustomerComponent implements OnInit {
//
//     bookings: ReservationDTO[] = [];
//     statusForm: FormGroup;
//     partnerId: any;
//
//     constructor(private clientService: ClientService, private fb: FormBuilder) { }
//
//     ngOnInit() {
//         this.partnerId = UserStorageService.getUserId();
//         this.fetchBookedCustomers();
//
//         // Initialize the form with default values
//         this.statusForm = this.fb.group({
//             jobStatus: ['', Validators.required],  // Status is required
//             startDate: [''],   // Start date can be empty initially
//             endDate: [''],     // End date can be empty initially
//         });
//     }
//
//     fetchBookedCustomers(): void {
//         this.clientService.getBookingCustomers().subscribe(
//             (data: ReservationDTO[]) => {
//                 this.bookings = data;
//                 console.log("Booked customer data", this.bookings);
//             },
//             (error) => {
//                 console.error('Error fetching booked customers:', error);
//             }
//         );
//     }
//
//     updateStatus(): void {
//         // Get the form values and ensure empty dates are set to null
//         const statusUpdate = {
//             ...this.statusForm.value,
//             startDate: this.statusForm.value.startDate || null,
//             endDate: this.statusForm.value.endDate || null,
//         };
//
//         console.log('Request payload:', statusUpdate);
//         console.log('Partner ID:', this.partnerId);
//
//         // Ensure the jobStatus is selected before making the request
//         if (!statusUpdate.jobStatus) {
//             console.error('Please select a status');
//             return;
//         }
//
//         this.clientService.updatePartnerJobStatus(this.partnerId, statusUpdate).subscribe(
//             (response) => {
//                 console.log("Job status updated successfully:", response);
//                 this.fetchBookedCustomers();  // Refresh the bookings after updating the status
//             },
//             (error) => {
//                 console.error("Error updating job status:", error);
//             }
//         );
//     }
// }
//


import { Component, OnInit } from '@angular/core';
import { ReservationDTO } from "../../model/ReservationDTO";
import { ClientService } from "../../client/services/client.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {UserStorageService} from "../../auth/services/user-stoarge.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
    selector: 'app-booked-customer',
    templateUrl: './booked-customer.component.html',
    styleUrls: ['./booked-customer.component.scss']
})
export class BookedCustomerComponent implements OnInit {

    bookings: ReservationDTO[] = [];
    statusForms: FormGroup[] = []; // Changed to an array of FormGroups
    partnerId: any;

    constructor(private clientService: ClientService, private fb: FormBuilder,
                private notification: NzNotificationService) { }

    ngOnInit() {
        this.partnerId = UserStorageService.getUserId();
        this.fetchBookedCustomers();
    }

    fetchBookedCustomers(): void {
        this.clientService.getBookingCustomers().subscribe(
            (data: ReservationDTO[]) => {
                this.bookings = data;
                console.log("Booked customer data", this.bookings);

                // Initialize the form for each booking
                this.bookings.forEach(() => {
                    const form = this.fb.group({
                        jobStatus: ['', Validators.required],  // Status is required
                        startDate: [''],   // Start date can be empty initially
                        endDate: [''],     // End date can be empty initially
                    });
                    this.statusForms.push(form);
                });
            },
            (error) => {
                console.error('Error fetching booked customers:', error);
            }
        );
    }

    updateStatus(bookingId: number, index: number): void {
        // Get the form values for the specific booking
        const statusUpdate = {
            ...this.statusForms[index].value,
            startDate: this.statusForms[index].value.startDate || null,
            endDate: this.statusForms[index].value.endDate || null,
        };

        console.log('Request payload:', statusUpdate);
        console.log('Partner ID:', this.partnerId);

        // Ensure the jobStatus is selected before making the request
        if (!statusUpdate.jobStatus) {
            console.error('Please select a status');
            return;
        }

        this.clientService.updatePartnerJobStatus(this.partnerId, statusUpdate).subscribe(
            (response) => {
                this.notification
                    .success(
                        'SUCCESS',
                        `'Partner status updated successfully`,
                        { nzDuration: 5000 }
                    );
                console.log("Job status updated successfully:", response);
                this.fetchBookedCustomers();  // Refresh the bookings after updating the status
            },
            (error) => {
                console.error("Error updating job status:", error);
            }
        );
    }
}

