import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-form',
  imports: [MatDialogModule],
  standalone: true,
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm {
  @Input() title: string = '';

  @Output() saveClicked = new EventEmitter<void>();
}
