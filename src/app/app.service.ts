import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Note } from './shared/interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl="http://localhost:3000/notes"

  constructor(private http:HttpClient) {}

  getNotes():Observable<Note[]>{
    return this.http.get<Note[]>(this.apiUrl)
  }

  getNotesById(id:number):Observable<Note[]>{
    return this.http.get<Note[]>(`${this.apiUrl}/${id}`)
  }

  createNote(note:Note):Observable<Note>{
    return this.http.post<Note>(this.apiUrl,note)
  }

  updateNote(note:Note):Observable<Note>{
    return this.http.patch<Note>(`${this.apiUrl}/${note.id}`,note)
  }

  deleteNote(id:number):Observable<Note>{
    return this.http.delete<Note>(`${this.apiUrl}/${id}`)
  }
}
