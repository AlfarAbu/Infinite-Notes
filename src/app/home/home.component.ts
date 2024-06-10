import { AppService } from "../app.service"
import { Component } from '@angular/core';
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
  viewType: string = ViewTypes.LIST;
  viewTypesEnum = ViewTypes;

  pinnedNotes: Note[] = [];
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  newModal?: BsModalRef;
  searchText: string = '';
  isEditing: boolean = false;


  constructor(private router: Router, private modalService: BsModalService, private AppService: AppService) {
    this.AppService.getNotes().subscribe((allNotes) => {
      this.filteredNotes = allNotes;
      this.cloneNotes()
    })
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


  showModal(index: number) {
    const note = this.filteredNotes[index];
    this.AppService.getNotesById(index).subscribe((getnote:Note)=>{
      this.modalService.show(NoteDetailsComponent, { initialState: { getnote:note } });
    })
  }

// getNoteId(index:number){
//     const note = this.filteredNotes[index];
//     this.AppService.getNotesById(note.id).subscribe((getnote:Note)=>{
//       this.modalService.show(NoteDetailsComponent,{initialState:{getnote:note}})
//     })
//     console.log(note);

//   }  


  editModal(index: number) {

    const initialState = {
      note: this.filteredNotes[index],
      isEditing: true,
    }
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


  pinNote(noteId: number): void {
    const noteIndex = this.filteredNotes.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      const pinnedNote = this.filteredNotes.splice(noteIndex, 1)[0];
      this.filteredNotes.unshift(pinnedNote);
    }
  }
  markAsPinned(index: number, unpin: boolean = false) {
    if (index > -1) {
      // Mark note as unpinned
      console.log(index, unpin)
      if (unpin) {
        const item = this.pinnedNotes[index];
        item['isPinned'] = false;


        // add item to filteredNotes array 
        this.filteredNotes.push(item);

        // remove item from filtered notes
        this.pinnedNotes.splice(index, 1);


      }
      // Mark not as pinned 
      else {
        const item = this.filteredNotes[index];
        item['isPinned'] = true;

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




