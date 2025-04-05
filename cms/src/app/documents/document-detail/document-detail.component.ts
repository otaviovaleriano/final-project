import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'app-document-detail',
  standalone: false,
  
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {

nativeWindow: any;
  
document: Document;

    constructor(
      private documentService: DocumentService,
      private windowRefService: WindRefService,
      private router: Router,
      private route: ActivatedRoute)
      {}


  ngOnInit() {
    this.nativeWindow = this.windowRefService.getNativeWindow();

    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.document = this.documentService.getDocument(id);
      }
    );
 } 
 
 onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView() {
    if(this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
 }

}

