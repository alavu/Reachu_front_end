import {Component, OnInit} from '@angular/core';
import {PartnerChatService} from "../services/partner-chat.service";
import {UserStorageService} from "../../auth/services/user-stoarge.service";
import {ConnectedUsers} from "../interfaces/ConnectedUsers";
import {ChatMessage} from "../../admin/pages/model/ChatMessage";
import {ChatService} from "../../client/services/chat-service";
import {MatDialog} from "@angular/material/dialog";
import {ClientVideocallComponent} from "../../client/pages/video-call/client-videocall.component";

@Component({
  selector: 'app-chat-client',
  templateUrl: './chat-client.component.html',
  styleUrls: ['./chat-client.component.scss']
})
export class ChatClientComponent implements OnInit {

    messageInput: string = '';
    partnerId!: number;
    messageList: any[] = [];
    roomId!: number;
    selectedUser: any;
    connectedUsers: ConnectedUsers[] = [];


    constructor(private partnerChat: PartnerChatService,
                private chatService: ChatService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.partnerId = UserStorageService.getUserId();
        this.loadConnectedUsers();
    }

    selectPartner(user: any) {
        this.selectedUser = user.id;
        console.log("selected user yyyy", this.selectedUser)
        this.createRoom(user.id);
    }


    createRoom(selectedUserId: number) {
        this.roomId = this.getRoomId(this.partnerId, selectedUserId);
        this.chatService.joinRoom(this.roomId);
        this.listenerMessage();
    }

    sendMessage() {
        console.log("Selected users xxxx",this.selectedUser.id)
        const chatMessage: ChatMessage = {
            message: this.messageInput,
            user_id: this.selectedUser.id,
            partner_id: this.partnerId
        }
        this.chatService.sendMessage(this.roomId, chatMessage);
        this.messageInput = '';
    }

    listenerMessage() {
        this.chatService.getMessageSubject().subscribe((messages: any) => {
            this.messageList = messages.map((item: any) => ({
                ...item,
                message_side: item.user === this.partnerId ? 'sender' : 'receiver'
            }));
        });
    }

    getRoomId(userId1: number, userId2: number): number {
        return userId1 < userId2 ? userId1 * 1000 + userId2 : userId2 * 1000 + userId1;
    }

    loadConnectedUsers(): void {
        this.partnerChat.getConnectedUsers(this.partnerId).subscribe({
            next: (partners: any[]) => {
                this.connectedUsers = partners;
            },
            error: (error) => {
                console.error('Error fetching connected partners', error);
            },
            complete: () => {
                console.log('Finished loading connected partners');
            }
        });
    }

    videoCallWithUser(): void {
        this.dialog.open(ClientVideocallComponent, {
            width: '80%', // Optional: Configure dialog width
            height: '80%', // Optional: Configure dialog height
            // data: { exampleData: 'Your data here' } // Optional: Pass data to the component
        });
    }
}
