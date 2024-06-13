import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Note } from '../shared/interfaces/note.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppService } from '../app.service';


@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDetailsComponent {
  @Input() getnote:any | null = null;
  
  id: number = 0;
  title: string = '';
  body: string = '';
  noteColor = "";
  isPinned: boolean = false;

  constructor(public bsModalRef: BsModalRef, public AppService: AppService) { }

  ngOnInit() {
    console.log("Init component", this.getnote)
   this.loadNote()

  }

  loadNote(){
    this.getnote.id=this.id,
    this.getnote.id=this.title,
    this.getnote.id=this.body
  }


}


