// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { UserManagementService } from '../../services/user-management.service';
// import { Users } from '../../model/users';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//     selector: 'app-user-management',
//     templateUrl: './user-management.component.html',
//     styleUrls: ['./user-management.component.scss']
// })
// export class UserManagementComponent implements OnInit {
//     users: Users[] = [];

//     constructor(
//         private userManagementService: UserManagementService,
//         private snackBar: MatSnackBar,
//         private changeDetector: ChangeDetectorRef
//     ) {}

//     ngOnInit(): void {
//         this.loadUsers();
//     }

//     loadUsers(): void {
//         // Load users from your backend API
//         this.userManagementService.getAllUsers().subscribe(data => {
//             console.log("DATA   ", data)
//             this.users = data.map(user => ({
//                 ...user,
//                 status: user.is_blocked ? 'INACTIVE' : 'ACTIVE'
//             }));
//             this.changeDetector.detectChanges();
//         });
//     }

//     toggleUserStatus(user: Users): void {
//         if (user.status === 'ACTIVE') {
//             this.blockUser(user.id);
//         } else {
//             this.unblockUser(user.id);
//         }
//     }

//     blockUser(userId: number): void {
//         const user = this.users.find(u => u.id === userId);
//         if (user) {
//             this.userManagementService.blockUser(userId).subscribe({
//                 next: (response) => {
//                     this.snackBar.open('Blocked successfully', 'Close', { duration: 1000 });
//                     console.log(`User ${userId} blocked successfully. Response:`, response);
//                     console.log(`User ${userId} blocked successfully.`);
//                     this.updateUserStatus(userId, 0, 'INACTIVE');  // 0 means inactive
//                 },
//                 error: (err) => {
//                     console.error('Error blocking user:', err);
//                 }
//             });
//         }
//     }


//     unblockUser(userId: number): void {
//         const user = this.users.find(u => u.id === userId);
//         if (user) {
//             this.userManagementService.unblockUser(userId).subscribe({
//                 next: () => {
//                     this.snackBar.open('Unblocked successfully', 'Close', { duration: 1000 });
//                     console.log(`User ${userId} unblocked successfully.`);
//                     this.updateUserStatus(userId, 1, 'ACTIVE');  // 1 means active
//                 },
//                 error: (err) => {
//                     console.error('Error unblocking user:', err);
//                 }
//             });
//         }
//     }

//     updateUserStatus(userId: number, is_blocked: number, status: string): void {
//         const user = this.users.find(u => u.id === userId);
//         if (user) {
//             user.is_blocked = Boolean(is_blocked);
//             user.status = status;
//             this.changeDetector.markForCheck();  // Trigger change detection
//         }
//     }
// }
