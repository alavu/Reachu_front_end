// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { AddressServiceService } from '../../services/address-service.service';
// import { Address } from 'src/app/company/model/Address';


// @Component({
//   selector: 'app-add-address-modal',
//   templateUrl: './add-address-modal.component.html',
//   styleUrls: ['./add-address-modal.component.css']
// })
// export class AddAddressModalComponent implements OnInit {
//   addressForm: FormGroup;
//   savedAddresses: Address[] = [
//     {
//       id: 1,
//       label: 'Home',
//       details: 'abc/123, Lane-4, Shastri Nagar, Maradu, Kochi, Ernakulam, Kerala 682304, India',
//     },
//   ];
//   selectedAddress: any = null;
//   isAddingNewAddress: boolean = false;
//   editIndex: number | null = null;
//   userId: number = 1; // Assume userId is known

//   constructor(
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<AddAddressModalComponent>,
//     private addressService: AddressServiceService
//   ) {}

//   ngOnInit(): void {
//     this.addressForm = this.fb.group({
//       label: ['', Validators.required],
//       details: ['', Validators.required],
//     });
//   }

//   toggleAddAddressMode(): void {
//     this.isAddingNewAddress = !this.isAddingNewAddress;
//     if (!this.isAddingNewAddress) {
//       this.addressForm.reset();
//       this.editIndex = null;
//     }
//   }

//   saveAddress(): void {
//     if (this.addressForm.valid) {
//       const newAddress: Address = this.addressForm.value;
//       if (this.editIndex !== null) {
//         const addressId = this.savedAddresses[this.editIndex].id;
//         this.addressService.updateAddress(addressId, newAddress).subscribe({
//           next: updatedAddress => {
//             this.savedAddresses[this.editIndex] = updatedAddress;
//             this.editIndex = null;
//             this.toggleAddAddressMode();
//           },
//           error: error => {
//             console.error('Error updating address:', error);
//             alert('Failed to update the address. Please try again.');
//           }
//         });
//       } else {
//         this.addressService.addAddress(newAddress).subscribe({
//           next: addedAddress => {
//             this.savedAddresses.push(addedAddress);
//             this.selectedAddress = addedAddress;
//             this.toggleAddAddressMode();
//           },
//           error: error => {
//             console.error('Error adding address:', error);
//             alert('Failed to add the address. Please try again.');
//           }
//         });
//       }
//     } else {
//       alert('Please fill in all required fields.');
//     }
//   }
  
//   editAddress(index: number): void {
//     this.editIndex = index;
//     this.isAddingNewAddress = true;
//     this.addressForm.patchValue(this.savedAddresses[index]);
//   }

//   deleteAddress(index: number): void {
//     const addressId = this.savedAddresses[index].id;
//     this.addressService.deleteAddress(addressId, this.userId).subscribe(() => {
//       this.savedAddresses.splice(index, 1);
//       if (this.selectedAddress === this.savedAddresses[index]) {
//         this.selectedAddress = null;
//       }
//     });
//   }

//   proceed(): void {
//     if (this.selectedAddress) {
//       this.dialogRef.close(this.selectedAddress);
//     }
//   }

//   onClose(): void {
//     this.dialogRef.close();
//   }

//   onAddressSelect(): void {
//     // Logic when an address is selected
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressServiceService } from '../../services/address-service.service';
import { Address } from 'src/app/company/model/Address';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss']
})
export class AddAddressModalComponent implements OnInit {
  addressForm: FormGroup;
  savedAddresses: Address[] = [];
  selectedAddress: Address | null = null;
  isAddingNewAddress: boolean = false;
  editIndex: number | null = null;
  userId: number = 1; // Replace with dynamic userId

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAddressModalComponent>,
    private addressService: AddressServiceService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      label: ['', Validators.required],
      details: ['', Validators.required],
    });
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAddresses(this.userId).subscribe({
      next: addresses => {
        this.savedAddresses = addresses;
      },
      error: error => {
        console.error('Error loading addresses:', error);
      }
    });
  }

  toggleAddAddressMode(): void {
    this.isAddingNewAddress = !this.isAddingNewAddress;
    if (!this.isAddingNewAddress) {
      this.addressForm.reset();
      this.editIndex = null;
    }
  }

  saveAddress(): void {
    if (this.addressForm.valid) {
      console.log('Address form is valid. Proceeding to save the address.');
      const newAddress: Address = {
        ...this.addressForm.value,
        userId: this.userId,
      };
  
      if (this.editIndex !== null) {
        const addressId = this.savedAddresses[this.editIndex].id!;
        console.log('Editing existing address with ID:', addressId);
        this.addressService.updateAddress(addressId, newAddress).subscribe({
          next: updatedAddress => {
            console.log('Address updated successfully:', updatedAddress);

            this.savedAddresses[this.editIndex!] = updatedAddress;
            this.selectedAddress = updatedAddress;
            this.editIndex = null;
            this.toggleAddAddressMode();
            this.dialogRef.close(updatedAddress); // Pass updated address
          },
          error: error => {
            console.error('Error updating address:', error);
            alert('Failed to update the address. Please try again.');
          }
        });
      } else {
        this.addressService.addAddress(newAddress).subscribe({
          next: addedAddress => {
            console.log('Address added successfully:', addedAddress);
            this.savedAddresses.push(addedAddress);
            this.selectedAddress = addedAddress;
            this.toggleAddAddressMode();
            this.dialogRef.close(addedAddress); // Pass new address
          },
          error: error => {
            console.error('Error adding address:', error);
            alert('Failed to add the address. Please try again.');
          }
        });
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
  

  editAddress(index: number): void {
    this.editIndex = index;
    this.isAddingNewAddress = true;
    this.addressForm.patchValue(this.savedAddresses[index]);
  }

  deleteAddress(index: number): void {
    const addressId = this.savedAddresses[index].id!;
    this.addressService.deleteAddress(addressId, this.userId).subscribe(() => {
      this.savedAddresses.splice(index, 1);
      if (this.selectedAddress === this.savedAddresses[index]) {
        this.selectedAddress = null;
      }
    });
  }

  proceed(): void {
    if (this.selectedAddress) {
      this.dialogRef.close(this.selectedAddress);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAddressSelect(): void {
    if (this.selectedAddress) {
      this.dialogRef.close(this.selectedAddress);
    }
  }
}
