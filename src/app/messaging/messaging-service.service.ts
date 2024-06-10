import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingServiceService {

  private stompClient: any;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
  }

  connectToChat(userId: number): Observable<any> {
    return new Observable<any>(observer => {
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe(`/user/queue/messages`, (message: { body: string; }) => {
          observer.next(JSON.parse(message.body));
        });
        this.stompClient.send(`/app/chat`, {}, JSON.stringify({ senderId: userId }));
      });
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  sendMessage(message: string, senderId: number, receiverId: number) {
    this.stompClient.send(`/app/chat`, {}, JSON.stringify({
      content: message,
      sender: { id: senderId },
      receiver: { id: receiverId }
    }));
  }
}