import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filters-form',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  standalone: true,
  templateUrl: './filters-form.html',
  styleUrl: './filters-form.scss',
})
export class FiltersForm {
  @Input() label = '';

  @Input() options: string[] = [];

  @Input() objectOptions: { id: string; name: string }[] = [];

  @Input() selected = '';
  @Output() selectionChange = new EventEmitter<string>();

  onChange(value: string) {
    this.selectionChange.emit(value);
  }

  isObjectMode(): boolean {
    return this.objectOptions && this.objectOptions.length > 0;
  }
}
