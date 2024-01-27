import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { modelChatMessage } from '../models/modelChatMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServices {

  private stompCliente: any;
  private messageSubject: BehaviorSubject<modelChatMessage[]> =
  new BehaviorSubject<modelChatMessage[]>([]);


  constructor() {
    this.initConnectionSocket(); 
  }

  initConnectionSocket() {
    const url = '//localhost:3000/chat-socket';
    const socket = new SockJS(url);
    this.stompCliente = Stomp.over(socket);
  }

  joinRoom(roomID: any) {
    this.stompCliente.connect({}, () => {
      this.stompCliente.subscribe(`/topic/${roomID}`, (messages: any) => {
        //this.showMessageOutput(JSON.parse(messages.body))
        const messageConten = JSON.parse(messages.body); 
  
        const currentMessages = this.messageSubject.getValue();
        currentMessages.push(messageConten);
  
        this.messageSubject.next([...currentMessages]); // Usar spread operator para mantener la inmutabilidad del array
      });
    });
  } 

  showMessageOutput(messageOutput: any) {
    var response = document.getElementById('response');
    const p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(messageOutput.from + ': '+
    response?.appendChild(p)))

  }

  sendMessage(roomID: string, chatMessage: modelChatMessage) {
    this.stompCliente.send(`/app/chat/${roomID}`, {}, JSON.stringify(chatMessage));
  }

  getMessageSubject() { 
    return this.messageSubject.asObservable();
  }

}
