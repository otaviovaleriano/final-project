import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  constructor(private messageService: MessageService) {}

  currentSender: string = '3';

@ViewChild('subject', {static: true}) subject: ElementRef;
@ViewChild('msgText', {static: true}) msgText: ElementRef;
@Output() addMessageEvent = new EventEmitter<Message>();

onSendMessage(): void{
  const subject = this.subject.nativeElement.value;
  const msgText = this.msgText.nativeElement.value;

  const newMessage = new Message
  (
    '3', subject, msgText, this.currentSender
  );
  
  this.messageService.addMessage(newMessage);
  this.onClear();
}

onClear() {
  this.subject.nativeElement.value = '';
  this.msgText.nativeElement.value = '';
}

}
