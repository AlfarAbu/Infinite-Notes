
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Note } from '../shared/interfaces/note.interface';



@Component({
  selector: 'app-modal-content',
  templateUrl: './note-pops.component.html',
  styleUrls: ['./note-pops.component.scss']
})
export class NotePopsComponent {

  @Input() note: Note | null = null;
  @Output() onClose: EventEmitter<Note> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }
  id: number = 0;
  title: string = '';
  content: string = '';
  noteColor= "";

  selectableColors = ["#FFA07A", "#9FE2BF", "#CCCCFF"];

  ngOnInit() {
    if (this.note) {
      this.title = this.note.title;
      this.content = this.note.content;
      this.noteColor = this.note.color;
      
    }
  }

  saveAndClose() {
    if (this.title.trim() && this.content.trim() && this.noteColor) {//remove the space for title and content
      //defining the properties inside the function

      const data: Note = {
        id: this.id,
        title: this.title,
        content: this.content,
        color: this.noteColor
      }

      this.onClose.emit(data);//once youclose  the eventemitter this will keep the value to its self
      this.bsModalRef.hide();//after closing it this will hide the modal
    } else {
      alert('No field should be empty');
    }


  }

  // getRandomColor(): string {
  //   let color = ["#FFA07A", "#9FE2BF", "#CCCCFF"];
  //   return color[Math.floor(Math.random() * color.length)];
  // }
  
}



