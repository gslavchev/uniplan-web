import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-button',
  imports: [MatIconModule],
  standalone: true,
  templateUrl: './add-button.html',
  styleUrl: './add-button.scss',
})
export class AddButton {
  @Output() addClicked = new EventEmitter<void>();

  onClick(): void {
    this.addClicked.emit();
  }
}
