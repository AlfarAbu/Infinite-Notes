
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Note } from '../shared/interfaces/note.interface';



@Component({
  selector: 'app-modal-body',
  templateUrl: './note-popup.component.html',
  styleUrls: ['./note-popup.component.scss']
})
export class NotePopupComponent {
  noteHeader="Update Note"

  @Input() note: Note | null = null;
  @Output() onClose: EventEmitter<Note> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }
  selectableColors =["#FFA07A","#9FE2BF","#CD5C5C","#B2864C","#61A68F","#5E932E","#1E757F","#956ACB","#86872F","#6F506D"];
  
  id: number |undefined;
  title: string = '';
  body: string = '';
  noteColor:string=this.selectableColors[0];
  isPinned:boolean=false;

  

  ngOnInit() {
    if (this.note) {
      this.id=this.note.id;
      this.title = this.note.title;
      this.body = this.note.body;
      this.noteColor = this.note.color;
    }
  }

  saveAndClose() {
    if (this.title.trim() && this.body.trim()) {//remove empty spaces before and after the property of title and body
      //defining the properties inside the function

      const data: Note = {
        id: this.note ? this.id :undefined,
        title: this.title,
        body: this.body,
        color:this.noteColor,
        isPinned:this.isPinned,
      }

      this.onClose.emit(data);//once youclose  the eventemitter this will keep the value to its self
      this.bsModalRef.hide();//after closing it this will hide the modal
    } else {
      alert('No field should be empty');//creating an alert method to prevent field being left empty
    }
  }
  selectColor(color:string){
    this.noteColor=color;
  }

  // getRandomColor(): string {
  //   let color = ["#FFA07A", "#9FE2BF", "#CCCCFF"];
  //   return color[Math.floor(Math.random() * color.length)];
  // }
  
}



