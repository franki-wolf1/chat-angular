import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatServices } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { modelChatMessage } from '../../models/modelChatMessage';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatComponent {
  messageInput: string = '';
  userId: string="";
  messageList: any[] = [{
    message: 'hola',
    user: '',
    state: '',
  }];

  constructor(private chatServices: ChatServices,
    private route: ActivatedRoute
    ){ 
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatServices.joinRoom(this.userId);
    this.listenerMessage();
  }

  sendMessage() { 
    console.log('22222222::::::::::_'+this.userId);
    
    const chatMessage = {
      message: this.messageInput,
      user: this.userId,
      state: this.userId + ' send'
    }as modelChatMessage

    this.chatServices.sendMessage(this.userId, chatMessage);
    this.messageInput = '';  
  }
 
  listenerMessage() {
    this.chatServices.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any)=> ({
        ...item,
        message_side: item.user === this.userId ? 'sender': 'receiver'
      }))
    });
  }
}
