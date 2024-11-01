import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  // Pagination Testing with Dummy data

  // Userslist = [
  //   { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', blocked: false },
  //   { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', blocked: true },
  //   { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '1122334455', blocked: false },
  //   { id: '4', name: 'Emily Davis', email: 'emily@example.com', phone: '2233445566', blocked: false },
  //   { id: '5', name: 'Chris Brown', email: 'chris@example.com', phone: '3344556677', blocked: true },
  //   { id: '6', name: 'Laura Wilson', email: 'laura@example.com', phone: '4455667788', blocked: false },
  //   { id: '7', name: 'Robert Lee', email: 'robert@example.com', phone: '5566778899', blocked: true },
  //   { id: '8', name: 'Paul Walker', email: 'paul@example.com', phone: '6677889900', blocked: false },
  //   { id: '9', name: 'Mia Jones', email: 'mia@example.com', phone: '7788990011', blocked: false },
  //   { id: '10', name: 'Steve Miller', email: 'steve@example.com', phone: '8899001122', blocked: false },
  //   // Add more dummy users as needed for testing
  // ];

  Userslist: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private userManagementService: UserManagementService,
    private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  // getAllUsers() {
  //   this.userManagementService.getAllUsers().subscribe(
  //     (response) => {
  //       console.log("User data received from backend:", response);
  //       console.log(Array.isArray(response))
  //       if (response && Array.isArray(response)) {
  //           this.Userslist = response;
  //           this.filteredUsers = response;
  //           this.calculatePagination();
  //           this.updatePaginatedUsers();
  //           this.changeDetector.detectChanges();
  //       } else {
  //           console.error('Unexpected response format:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching user list:', error);
  //     }
  //   );
  // }

  getAllUsers() {
    this.userManagementService.getAllUsers().subscribe({
        next: (response) => {
            console.log("User data received from backend:", response);
            if (response && Array.isArray(response)) {
                this.Userslist = response;
                this.filteredUsers = response;
                this.calculatePagination();
                this.updatePaginatedUsers();
                this.changeDetector.detectChanges();
            } else {
                console.error('Unexpected response format:', response);
            }
        },
        error: (error) => {
            console.error('Error fetching user list:', error);
        },
        complete: () => {
            console.log('User fetching process completed.');
        }
    });

}

  filterUsers() {
    this.filteredUsers = this.Userslist.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.phone.includes(this.searchQuery)
    );
    this.calculatePagination();
    this.updatePaginatedUsers();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    console.log("Total page", this.totalPages)
    if (this.currentPage > this.totalPages) {
      console.log("Current page", this.currentPage)
      this.currentPage = this.totalPages;
    }
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  blockUser(userId: string) {
    this.userManagementService.blockUser(userId).subscribe(
      (response) => {
          this.getAllUsers();
        console.log("User blocked successfully:", response);
        this.updateUserStatus(userId, response.blocked);
        // this.changeDetector.detectChanges();
      },
      (error) => {
        console.error('Error blocking user:', error);
      }
    );
  }

  UnblockUser(userId: string) {
    this.userManagementService.unblockUser(userId).subscribe(
      (response) => {
          this.getAllUsers();
        console.log("User unblocked successfully:", response);
        this.updateUserStatus(userId, response.blocked);
        this.changeDetector.detectChanges();
      },
      (error) => {
        console.error('Error unblocking user:', error);
      }
    );
  }

  updateUserStatus(userId: string, isBlocked: boolean) {
    const user = this.Userslist.find(user => user.id === userId);
    if (user) {
      user.blocked = isBlocked;
      this.filterUsers();
      this.changeDetector.detectChanges();
    }
  }
}

