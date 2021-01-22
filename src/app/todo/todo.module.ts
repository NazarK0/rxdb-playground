import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import TodoComponent from "./components/todo/todo.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  declarations: [TodoComponent],

  exports: [TodoComponent]
})
export default class TodoModule {}
