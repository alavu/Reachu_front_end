// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ChatService } from '../../services/chat-service';
// import { ChatMessage } from 'src/app/admin/pages/model/ChatMessage';
// import { UserStorageService } from 'src/app/basic/services/storage/user-stoarge.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.scss']
// })
// export class ChatComponent {
//   messageInput: string = '';
//   userId!: number;
//   messageList: any[] = [];

//   constructor(private chatService: ChatService,
//     private route: ActivatedRoute
//     ){

//   }

//   ngOnInit(): void {
//     this.userId = UserStorageService.getUserId();
//     this.chatService.joinRoom("ABC");
//     this.lisenerMessage();
//   }

//   sendMessage() {
//     console.log("User id is: ", this.userId)
//     const chatMessage = {
//       message: this.messageInput,
//       user: this.userId
//     }as ChatMessage
//     this.chatService.sendMessage("ABC", chatMessage);
//     this.messageInput = '';
//   }

//   lisenerMessage() {
//     this.chatService.getMessageSubject().subscribe((messages: any) => {
//       this.messageList = messages.map((item: any)=> ({
//         ...item,
//         message_side: item.user === this.userId ? 'sender': 'receiver'
//       }))
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service';
import { ChatMessage } from 'src/app/admin/pages/model/ChatMessage';
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';
import { ClientService } from '../../services/client.service';
import {ConnectedPartners} from "../../../model/ConnectedPartners";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ClientVideocallComponent} from "../video-call/client-videocall.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageInput: string = '';
  userId!: number;
  messageList: any[] = [];
  roomId!: number;
  // connectedPartners: any[] = [];
  connectedPartners: ConnectedPartners[] = [];
  selectedPartner: any;
  isChatVisible: boolean = false;

  constructor(private chatService: ChatService,
              private dialog: MatDialog,
              private  router: Router,
              private clientService: ClientService) {}

  ngOnInit(): void {
    this.userId = UserStorageService.getUserId();
    this.loadConnectedPartners();  // Fetch connected partners on load
  }

  // When a partner is selected, create a chat room and show chat window
  selectPartner(partner: any) {
      this.selectedPartner = partner.id;
      console.log("selected partner yyyy", this.selectedPartner)
      this.createRoom(partner.id);
  }

createRoom(selectedUserId: number) {
  this.roomId = this.getRoomId(this.userId, selectedUserId);
  this.chatService.joinRoom(this.roomId);
  this.listenerMessage();
}

  sendMessage() {
    console.log("Selected partner xxxx",this.selectedPartner.id)
    const chatMessage: ChatMessage = {
      message: this.messageInput,
      user_id: this.userId,
      partner_id: this.selectedPartner.id
    }
    this.chatService.sendMessage(this.roomId, chatMessage);
    this.messageInput = '';
  }

  listenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }));
    });
  }

  getRoomId(userId1: number, userId2: number): number {
    return userId1 < userId2 ? userId1 * 1000 + userId2 : userId2 * 1000 + userId1;
  }

    loadConnectedPartners(): void {
        this.clientService.getConnectedPartners(this.userId).subscribe({
            next: (partners: any[]) => {
                this.connectedPartners = partners;
            },
            error: (error) => {
                console.error('Error fetching connected partners', error);
            },
            complete: () => {
                console.log('Finished loading connected partners');
            }
        });
    }

    videoCall(): void {
        this.dialog.open(ClientVideocallComponent, {
            width: '100%', // Optional: Configure dialog width
            height: '100%', // Optional: Configure dialog height
            // data: { exampleData: 'Your data here' } // Optional: Pass data to the component
        });
    }

}
