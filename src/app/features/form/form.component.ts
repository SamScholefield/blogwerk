import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormMode } from '@enums';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  private route = inject(ActivatedRoute);
  formMode: FormMode | null = null;
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.formMode = data['formMode'];
    });
  }
}
