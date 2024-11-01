import { Component } from '@angular/core';
import {ClientService} from "../../client/services/client.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-partner-bookings',
  templateUrl: './partner-bookings.component.html',
  styleUrls: ['./partner-bookings.component.scss']
})
export class PartnerBookingsComponent {
    bookings: any[] = [];
    filterForm: FormGroup;

    constructor(private clientService: ClientService, private fb: FormBuilder) {}

    ngOnInit() {
        this.filterForm = this.fb.group({
            status: [null],
            startDate: [null],
            endDate: [null]
        });
    }

    fetchBookings() {
        const status = this.filterForm.get('status').value;
        const startDate = this.filterForm.get('startDate').value;
        const endDate = this.filterForm.get('endDate').value;

        this.clientService.getBookings(status, startDate, endDate).subscribe(res => {
            this.bookings = res;
        });
    }
}
