import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import RxDbService from "../database/services/rxdb.service";
import TodoComponent from "./components/todo/todo.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TodoComponent],

  exports: [TodoComponent]
})
export default class TodoModule {}
