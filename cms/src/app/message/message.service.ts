import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    
  messages: Message[] = [];
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number;
  private firebase = 'https://cms-project-6909a-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { 
    this.maxMessageId = 0; 
    this.getMessages(); 
  }

  getMessages() {
    this.http.get<Message[]>(`${this.firebase}/messages.json`)
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages ? messages : [];
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages() {
    const msgArray = JSON.stringify(this.messages); 
  
 
    const firebaseJSON = `${this.firebase}/messages.json`;
  
    this.http.put(firebaseJSON, msgArray, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .subscribe(
      () => {
        this.messageChangedEvent.next(this.messages.slice()); 
      },
      (error) => {
        console.error('Error saving messages:', error);
      }
    );
  }  
}
