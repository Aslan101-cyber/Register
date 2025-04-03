// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService, Contact } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  contacts: Contact[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.loadPaginatedContacts();
  }

  loadAllContacts(): void {
    this.homeService.getContacts().subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      error: (error: any) => {
        console.error('Error loading contacts:', error);
      }
    });
  }

  loadPaginatedContacts(): void {
    this.homeService.getPaginatedContacts(this.currentPage, this.pageSize).subscribe({
      next: (result: { contacts: Contact[]; total: number; }) => {
        this.contacts = result.contacts;
        this.totalItems = result.total;
      },
      error: (error: any) => {
        console.error('Error loading paginated contacts:', error);
      }
    });
  }

  searchByEmail(email: string): void {
    this.homeService.getContactByEmail(email).subscribe({
      next: (contact: any) => {
        this.contacts = contact ? [contact] : [];
      },
      error: (error: any) => {
        console.error('Error searching contact:', error);
      }
    });
  }
}