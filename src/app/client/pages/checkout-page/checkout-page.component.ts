import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  selectedAddress: any = null;
  addressSelected: boolean = false;
  ad:any;
  stripePromise = loadStripe(environment.stripe);

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.selectedAddress = navigation.extras.state['selectedAddress'];
    }
    if (this.selectedAddress) {
      this.addressSelected = true;
    }
       // Retrieve adId from the route parameters
       this.ad = UserStorageService.getAdData();
       console.log("AdId",this.ad)

    // this.getAdDetailsByAdId();
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddAddressModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedAddress = result;
        this.addressSelected = true;
      }
    });
  }

  calculateTotal(price: number): number {
    const discount = 50;  // Discount can also be dynamic if needed
    const taxesAndFee = 79; // This can be made dynamic as well
    return price - discount + taxesAndFee;
  }


  async pay(): Promise<void> {
    const reservationId = UserStorageService.getReservationId();
    // here we create a payment object
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: 99900,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: `http://localhost:4200/success?reservationId=${reservationId}`
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.http.post(`${environment.apiBaseUrl}/api/payment`, payment)
    .subscribe(
      (data: any) => {
        if (data && data.id) {
          // Ensure the `id` exists before redirecting
          console.log("session id", data)
          stripe?.redirectToCheckout({
            sessionId: data.id,
          });
        } else {
          console.error('Payment response does not contain session ID:', data);
        }
      },
      (error) => {
        console.error('Error occurred during payment request:', error);
      }
    );
}
}
