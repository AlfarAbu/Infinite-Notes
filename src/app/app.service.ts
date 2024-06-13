import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Note } from './shared/interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // public title: string = "";

  private readonly SERVER = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    const url = `${this.SERVER}/notes`;
    return this.http.get<Note[]>(url)
  }

  // getNotesById(note:Note): Observable<Note> {
  //   const url = `${this.SERVER}/notes/${note.id}`;
  //   return this.http.get<Note>(url)
  // }
  getNotesById(index:number): Observable<Note> {
    const url = `${this.SERVER}/notes/${index}`;
    return this.http.get<Note>(url)
  }

  createNote(note: Note): Observable<Note> {
    const url = `${this.SERVER}/notes`;
    return this.http.post<Note>(url, note)
  }

  updateNote(note: Note): Observable<Note> {
    const url = `${this.SERVER}/notes/${note.id}`;
    return this.http.patch<Note>(url, note)
  }

  deleteNote(id: number): Observable<Note> {
    const url = `${this.SERVER}/notes/${id}`;
    return this.http.delete<Note>(url)
  }
}
