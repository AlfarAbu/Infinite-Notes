import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../shared/interfaces/note.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent {
  @Input() note: Note | null = null;
  @Output() onClose: EventEmitter<Note> = new EventEmitter();


  constructor(public bsModalRef: BsModalRef) {}
  id: number = 0;
  title: string = '';
  content: string = '';
  noteColor= "";
  isPinned:boolean=false;


  closeNote(){
    if (this.title.trim() && this.content.trim()) {

      const data: Note = {
        id: this.id,
        title: this.title,
        content: this.content,
        color:this.noteColor,
        isPinned:this.isPinned,
        
      }

      this.onClose.emit(data);//once youclose  the eventemitter this will keep the value to its self
      
      this.bsModalRef.hide();//after closing it this will hide the modal
  }

  }}


