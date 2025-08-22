import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-filter',
  imports: [CommonModule, MatFormField, MatInputModule, MatIconModule],
  standalone: true,
  templateUrl: './input-filter.html',
  styleUrl: './input-filter.scss',
})
export class InputFilter {
  @Input() label: string = '';
  @Input() searchText = '';
  @Output() searchTextChange = new EventEmitter<string>();
}
