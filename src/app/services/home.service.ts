// home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Contact {
  FirstName: string;
  LastName: string;
  Address: string;
  Phone: string;
  Email: string;
  Gender: string;
  Country: string;
  DateOfBirth: string;
  JobTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'assets/contacts.json';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPaginatedContacts(page: number, pageSize: number): Observable<{ contacts: Contact[], total: number }> {
    return this.http.get<Contact[]>(this.apiUrl)
      .pipe(
        map(contacts => {
          const startIndex = (page - 1) * pageSize;
          const paginatedContacts = contacts.slice(startIndex, startIndex + pageSize);
          return {
            contacts: paginatedContacts,
            total: contacts.length
          };
        }),
        catchError(this.handleError)
      );
  }

  getContactByEmail(email: string): Observable<Contact | undefined> {
    return this.http.get<Contact[]>(this.apiUrl)
      .pipe(
        map(contacts => contacts.find(contact => contact.Email === email)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}