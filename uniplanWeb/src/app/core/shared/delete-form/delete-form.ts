import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-form',
  imports: [MatDialogModule, FormsModule, MatInputModule],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss',
})
export class DeleteForm {
  @Input() title: string = '';

  @Output() deleteClicked = new EventEmitter<void>();
}
