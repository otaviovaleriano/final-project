import { Document } from './document.model';
import { MOCKDOCUMENTS2 } from './MOCKDOCUMENTS2';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentService {

    documents: Document[] = [];
    maxDocumentId: number;
    documentSelectedEvent = new EventEmitter<Document>();
    documentListChangedEvent = new Subject<Document[]>();

    constructor(private http: HttpClient) {
    }

    firebase = 'http://localhost:3000/documents';

    getDocuments() {
        this.http.get<Document[]>(`${this.firebase}`)
        .subscribe(

          (documents: Document[]) => {
            this.documents = documents ? documents : []; 
      
            this.maxDocumentId = this.getMaxId();

            this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

            this.documentListChangedEvent.next(this.documents.slice());
          },
          (error: any) => {
            console.error('Error fetching documents:', error);
          }
        );
      }  

      storeDocuments() {
        const documentJSON = JSON.stringify(this.documents);

        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

        this.http.put(`${this.firebase}/documents.json`, documentJSON, { headers })
          .subscribe(() => {
            this.documentListChangedEvent.next(this.documents.slice());
          }, (error) => {
            console.error('Error storing documents:', error);
          })
      }

    // getDocuments() {
    //     return this.documents.slice();
    //   }
    

    getDocument(id: string): Document {
        for (const document of this.documents) {
            if (document.id === id) {
                return document;
            }
        }
        return null;

    }

    deleteDocument(document: Document) {

        if (!document) {
          return;
        }
    
        const pos = this.documents.findIndex(d => d.id === document.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/documents/' + document.id)
          .subscribe(
            (response: Response) => {
              this.documents.splice(pos, 1);
            //   this.sortAndSend();
            }
          );
      }

    getMaxId(): number {
        let maxId = 0;
        for (const document of this.documents) {
            const currentId = +document.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    addDocument(document: Document) {
        if (!document) {
          return;
        }
    
        // make sure id of the new Document is empty
        document.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
          document,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new document to documents
              this.documents.push(responseData.document);
            //   this.sortAndSend();
            }
          );
      }



      updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
          return;
        }
    
        const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    
        if (pos < 0) {
          return;
        }
    
        // set the id of the new Document to the id of the old Document
        newDocument.id = originalDocument.id;
        // newDocument._id = originalDocument._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/documents/' + originalDocument.id,
          newDocument, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.documents[pos] = newDocument;
            //   this.sortAndSend();
            }
          );
      }

}