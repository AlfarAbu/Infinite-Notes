import { AppService } from "../app.service"
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotePopupComponent } from '../note-popup/note-popup.component';
import { Note } from '../shared/interfaces/note.interface';
import { NoteDetailsComponent } from '../note-details/note-details.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Input() disableSearch: boolean = false;
  @Input() viewType: string = ViewTypes.LIST;
  @Output() onItemDeleted: EventEmitter<any> = new EventEmitter();
  viewTypesEnum = ViewTypes;

  pinnedNotes: Note[] = [];
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  newModal?: BsModalRef;
  searchText: string = '';
  isEditing: boolean = false;

  title: string = "";

  constructor(private router: Router, private modalService: BsModalService, private AppService: AppService) {
    //  this.title = this.AppService.title;

    this.AppService.getNotes().subscribe((allNotes) => {
      this.filteredNotes = allNotes;
      this.cloneNotes()
    })
  }

  ngOnChanges(simpleChange: SimpleChanges){
    console.log("Change detected", simpleChange)
  }

  openModal() {
    const modalRef: BsModalRef<NotePopupComponent> = this.modalService.show(NotePopupComponent);
    console.log(modalRef)
    modalRef.content?.onClose.subscribe((result: Note) => {
      if (result) {
        this.AppService.createNote(result).subscribe(creatingNote => {
          this.filteredNotes.push(creatingNote)
          this.cloneNotes()
        })
      } else {
        alert("note is not getting created")
      }
    })
  };


  showModal(index: any) {
  const initialState = {
    note: this.filteredNotes[index],
  }
  const noteid=initialState.note.id;
  this.AppService.getNotesById(noteid).subscribe((getnote:Note)=>{{
    this.modalService.show(NoteDetailsComponent,{initialState:{getnote}});
  }})
}
  editModal(index: number) {
    const initialState = {
      note: this.filteredNotes[index],
      isEditing: true,
    }
    console.log(initialState.note.id)
    if (this.filteredNotes[index]) {
      const modalRef: BsModalRef<NotePopupComponent> = this.modalService.show(NotePopupComponent, { initialState });

      modalRef.content?.onClose.subscribe((updateNote: Note) => {
        if (updateNote) {
          this.AppService.updateNote(updateNote).subscribe(() => {
            this.filteredNotes[index] = updateNote;
            this.cloneNotes();
            console.log(updateNote)
          })
          console.log('after:', updateNote);
        }
      })

    }
  }

  searchNotes(searchText: string) {
    // console.log(this.filteredNotes, this.notes)
    if (searchText !== '') {
      this.filteredNotes = this.notes.filter(note => {
        return note.title.toLowerCase().includes(this.searchText.toLowerCase())
      })

    }
    else {
      this.resetSearch();
      // console.log(this.filteredNotes)
    }
  }

  resetSearch() {
    this.searchText = "";
    this.filteredNotes = this.notes;
    // console.log(this.filteredNotes, this.notes);

  }

  cloneNotes() {
    this.notes = JSON.parse(JSON.stringify([...this.filteredNotes]))
  }

  deleteListContent(index: number) {
    const id = this.filteredNotes[index].id;
    this.onItemDeleted.emit(id);
    if (confirm("Are you sure!")) {
      this.AppService.deleteNote(id).subscribe(() => {
        this.filteredNotes.splice(index, 1)
        this.cloneNotes();
      })
    }
  }

  doSorting(type: ViewTypes) {
    console.log(type)
    this.viewType = type;
  }


  markAsPinned(index: number, unpin: boolean = false) {
    if (index > -1) {
      // Mark note as unpinned
      //console.log(index, unpin)
      if (unpin) {
        const item = this.pinnedNotes[index];
        item.isPinned= false;
        this.AppService.updateNote(item).subscribe(()=>{
          item.isPinned=false;
       })
        // add item to filteredNotes array 
        this.filteredNotes.push(item);

        // remove item from filtered notes
        this.pinnedNotes.splice(index, 1);
      }
      // Mark not as pinned 
      else {
        const item = this.filteredNotes[index];
        //item['isPinned'] = true;
         item.isPinned=true;
         
         this.AppService.updateNote(item).subscribe(()=>{
          item.isPinned=true;
        })

        // add item to pinned array 
        this.pinnedNotes.push(item);
        

        // remove item from filtered notes
        this.filteredNotes.splice(index, 1);
      }
    }

  }
}


export enum ViewTypes {
  LIST = "list",
  CARD = "card"
}




