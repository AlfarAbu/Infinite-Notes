import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent } from './home/home.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NotePopsComponent} from './note-pops/note-pops.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteDetailsComponent } from './note-details/note-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotePopsComponent,
    NoteDetailsComponent
    ,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
