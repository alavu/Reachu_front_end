/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/services/client.service';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.scss']
})
export class SucessComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  const reservationId = this.route.snapshot.queryParamMap.get('reservationId');
  this.updatePaymentDetails(reservationId)
  }

  updatePaymentDetails(reservationId: string | null): void {
    if (!reservationId) {
      console.error('No reservation ID found for payment update.');
      return;
    }

    this.clientService.updateReservationPayment(reservationId, {
      paymentMode: 'Stripe',
      paymentStatus: 'Paid'
    }).subscribe(
      (response) => {
        console.log('Payment details updated');
        // Show success message or navigate to another page
      },
      (error) => {
        console.error('Error updating payment details:', error);
      }
    )
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';
import { ClientService } from 'src/app/client/services/client.service';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.scss']
})
export class SucessComponent implements OnInit {
  status: string | null = null;
  reservationId: string | null = null;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch reservationId from the query parameters after payment
    this.reservationId = this.route.snapshot.queryParamMap.get('reservationId');
    console.log("Reservation ID from payment:", this.reservationId);
    if (this.reservationId) {
      this.updatePaymentDetails(this.reservationId);
    } else {
      console.error('Reservation ID is missing.');
    }
  }

  updatePaymentDetails(reservationId: string): void {
    this.clientService.updateReservationPayment(reservationId, {
      paymentMode: 'Stripe',
      paymentStatus: 'Paid'
    }).subscribe(
      (response) => {
        console.log('Payment details updated');
        // Show success message or navigate to another page
      },
      (error) => {
        console.error('Error updating payment details:', error);
      }
    );
  }
}
