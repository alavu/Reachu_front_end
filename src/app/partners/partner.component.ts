import {Component} from '@angular/core';

@Component({
    selector: 'app-partner',
    template: `
        <div class="flex h-screen overflow-hidden">
            <!-- Sidebar -->
            <partner-navbar class="flex-none"></partner-navbar>
            <!-- Main content -->
            <div class="flex-grow  overflow-y-auto w-full bg-gray-100">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class PartnerComponent {

}
