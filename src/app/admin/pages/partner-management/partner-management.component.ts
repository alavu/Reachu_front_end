import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartnerManagementService } from 'src/app/partners/services/partner-management-service';

@Component({
  selector: 'app-partner-management',
  templateUrl: './partner-management.component.html',
  styleUrls: ['./partner-management.component.scss']
})
export class PartnerManagementComponent implements OnInit {
  partners: any[] = [];
  filteredPartners: any[] = [];
  paginatedPartners: any[] = [];
  showRejectionModal = false;
  rejectionReason: string = '';
  selectedPartnerId: string | null = null;
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private partnerService: PartnerManagementService, private cdr: ChangeDetectorRef,
     private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners() {
    this.partnerService.getAllPartners().subscribe((data: any) => {
      console.log("Partner data", data)
      this.partners = data;
      this.paginatePartners();
      this.cdr.detectChanges(); 
    });
  }

  filterPartners() {
    const filtered = this.partners.filter(partner => 
      partner.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.paginatePartners(filtered);
  }

  paginatePartners(filteredPartners?: any[]) {
    const partnersToPaginate = filteredPartners || this.partners;
    const pageSize = 10; // Adjust the page size as needed
    this.totalPages = Math.ceil(partnersToPaginate.length / pageSize);
    this.paginatedPartners = partnersToPaginate.slice((this.currentPage - 1) * pageSize, this.currentPage * pageSize);
}


  blockPartner(userId: string) {
    this.partnerService.blockPartner(userId).subscribe(() => {
      this.loadPartners();
    });
  }

  unblockPartner(userId: string) {
    this.partnerService.unblockPartner(userId).subscribe(() => {
      this.loadPartners();
    });
  }

  verifyPartner(userId: string) {
    this.partnerService.verifyPartner(userId).subscribe(() => {
      this.loadPartners();
    });
  }

  // Reject a partner
// rejectPartner(userId: string) {
//   this.partnerService.rejectPartner(userId).subscribe(() => {
//       this.loadPartners();  // Reload the list after rejection
//       this.snackBar.open('Partner rejected', 'Close', { duration: 3000 });
//   });
// }

  // Show rejection modal and save the partner ID
  openRejectionModal(partnerId: string) {
    console.log('Opening modal for partner:', partnerId); // Debugging
    this.selectedPartnerId = partnerId;
    this.rejectionReason = ''; // Reset the rejection reason
    this.showRejectionModal = true;
  }
  

    // Close the rejection modal
    cancelRejection() {
      this.showRejectionModal = false;
      this.selectedPartnerId = null;
    }
    
    confirmRejection(partnerId: string) {
      if (this.rejectionReason.trim()) {
        this.partnerService.rejectPartner(partnerId, this.rejectionReason).subscribe(() => {
          this.loadPartners(); // Reload partners list after rejection
          this.snackBar.open('Partner rejected successfully', 'Close', { duration: 3000 });
          this.showRejectionModal = false;
        });
      } else {
        this.snackBar.open('Rejection reason is required', 'Close', { duration: 3000 });
      }
    }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatePartners();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatePartners();
    }
  }
}
