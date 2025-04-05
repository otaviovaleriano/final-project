import { Component, OnDestroy } from '@angular/core';
import { Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subject, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-document-list',
  standalone: false,

  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription: Subscription;

  // @Output() documentSelectedEvent = new EventEmitter<Document>();
  // @Output() documentListChangedEvent = new Subject<Document>();

 

  constructor(private documentService: DocumentService) {

  }

  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    this.documentService.getDocuments();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
