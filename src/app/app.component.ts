import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InfiniteNotes';

  constructor(private _appService: AppService){
    // this._appService.title = "sceojwofjwii"
  }

  itemDeleted(id: any){
    console.log("item deleted", id)
  }
}
