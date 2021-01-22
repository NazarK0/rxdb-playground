import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import RxDbService from './database/services/rxdb.service';
import TodoModule from './todo/todo.module';
import { initDatabase, DatabaseHardService } from './database/services/databasehard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    TodoModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    DatabaseHardService,
    // RxDbService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
