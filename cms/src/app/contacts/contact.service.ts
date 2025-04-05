import { Subject } from 'rxjs';
import { Contact } from './contact.module';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  maxContactId: number;

  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new Subject<Contact>();

  contacts: Contact[] = [];

  // contactChangedEvent = new EventEmitter<Contact[]>();

  private database = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts() {
    this.http.get<Contact[]>(this.database).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts ? contacts : [];
        this.maxContactId = this.getMaxId();

        this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }


  // getContact(id: string): Contact {
  //     for (let contact of this.contacts) {
  //         if (contact.id === id) {
  //             return contact;
  //         }
  //     }
  //     return null;
  // }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }

    // Delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          // this.sortAndSend(); 
        },
        (error) => {
          console.error('Error deleting contact:', error);
        }
      );
  }
  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Send POST request to the backend
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // Add the new contact to the local array
          this.contacts.push(responseData.contact);
          // this.sortAndSend();
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Send PUT request to the backend
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          // Update the local contact list after successful update
          this.contacts[pos] = newContact;
          // this.sortAndSend();
        },
        (error) => {
          console.error('Error updating contact:', error);
        }
      );
  }


}