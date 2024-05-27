
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotePopsComponent } from '../note-pops/note-pops.component';
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
  filteredNotes: Note[] = [
    { id: 1, title: "HTML", content: 'HyperText Markup Language is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content.', color: "#FFA07A", isPinned: true },
    { id: 2, title: "CSS", content: 'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML.', color: "#9FE2BF", isPinned: false },
    { id: 3, title: "Javascript", content: 'JavaScript, often abbreviated as JS, is a programming language and core technology of the Web, alongside HTML and CSS. 99% of websites use JavaScript on the client side for webpage behavior', color: "#CD5C5C", isPinned: false },
    { id: 4, title: "Python", content: 'Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected.', color: "#B2864C", isPinned: false },
    { id: 5, title: "PHP", content: 'PHP is a general-purpose scripting language geared towards web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1993 and released in 1995. The PHP reference implementation is now produced by the PHP Group.', color: "#5E932E", isPinned: false },
    { id: 6, title: "AngularJs", content: 'AngularJS is a discontinued free and open-source JavaScript-based web framework for developing single-page applications. It was maintained mainly by Google and a community of individuals and corporations.', color: "#9FE2BF", isPinned: false },
  //   { id: 7, title: "ReactJs", content: 'React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.', color: "#1E757F", isPinned: false }
  // 
];
  newModal?: BsModalRef;
  searchText: string = '';
  isEditing: boolean = false;


  constructor(private router: Router, private modalService: BsModalService) {
    this.cloneNotes()
  }

  openModal() {
    const modalRef: BsModalRef<NotePopsComponent> = this.modalService.show(NotePopsComponent);
    modalRef.content?.onClose.subscribe((result: Note) => {
      if (result) {
        this.filteredNotes.push(result);

        this.cloneNotes()
      }
    });
  }


  showModal(index: number) {
    const note = this.filteredNotes[index];
    // console.log(note);
    this.modalService.show(NoteDetailsComponent, { initialState: { note: note } });
  }


  editModal(index: number) {

    const initialState = {

      note: this.filteredNotes[index],
      isEditing: true,
    }
    if (this.filteredNotes[index]) {
      const modalRef: BsModalRef<NotePopsComponent> = this.modalService.show(NotePopsComponent,
        { initialState });

      modalRef.content?.onClose.subscribe((updateNote: Note) => {
        if (updateNote) {
          this.filteredNotes[index] = updateNote;
          this.cloneNotes();
        }
      })
    }
  }

  searchNotes(searchText:string) {
    // console.log(this.filteredNotes, this.notes)
    if (searchText !== '') {
      this.filteredNotes = this.notes.filter(note => {
        return note.title.toLowerCase().includes(this.searchText.toLowerCase())
      })
      // console.log(this.notes)
    }
    else {
      this.resetSearch();
      // console.log(this.filteredNotes)
    }
  }

  resetSearch() {
    this.searchText = "";
    this.filteredNotes=this.notes;
    // console.log(this.filteredNotes, this.notes);

  }

  cloneNotes() {
    this.notes = JSON.parse(JSON.stringify([...this.filteredNotes]))
  }

  deleteListContent(index: number) {
    if (confirm("Are you sure!")) {
      this.filteredNotes.splice(index, 1)
      this.cloneNotes();
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
  markAsPinned(index: number, unpin:boolean = false) {
    if(index > -1){
      // Mark note as unpinned
      console.log(index, unpin)
      if(unpin){
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




