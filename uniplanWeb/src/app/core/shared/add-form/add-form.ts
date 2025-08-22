import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-form',
  imports: [MatDialogModule, FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss',
})
export class AddForm {
  @Input() title: string = '';

  @Output() saveClicked = new EventEmitter<void>();
}
