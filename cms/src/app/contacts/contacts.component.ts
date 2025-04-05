import { Component } from '@angular/core';
import { Contact } from './contact.module';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  
  constructor() { }

  ngOnInit() {

  }




}
