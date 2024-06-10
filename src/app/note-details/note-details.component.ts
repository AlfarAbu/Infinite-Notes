import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../shared/interfaces/note.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppService } from '../app.service';


@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent {
  @Input() getnote: Note | null=null;
  @Output() onClose: EventEmitter<Note> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,private AppService:AppService) {}
  id: number = 0;
  title: string = '';
  body: string = '';
  noteColor= "";
  isPinned:boolean=false;


  closeNote(){
    
    if (this.title.trim() && this.body.trim()) {
      const data: Note = {
        id: this.id,
        title: this.title,
        body: this.body,
        color:this.noteColor,
        isPinned:this.isPinned,
      }
      this.onClose.emit(data);//once youclose  the eventemitter this will keep the value to its self
      this.bsModalRef.hide();//after closing it this will hide the modal
  }

  }}


