import { TemplateData, templateResponse } from './../../../interfaces/interfaces';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EmailTemplatesService } from '../../services/email-templates.service';
import { error } from 'console';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [NavbarComponent, MatExpansionModule, MatTableModule, RouterLink],
})
export class SettingsComponent implements OnInit {
  panelOpenState = false;
  templateData?: TemplateData[];
  templateServices: EmailTemplatesService = inject(EmailTemplatesService)

  ngOnInit(): void {
    this.templateServices.getTemplatesData().subscribe({
      next: (resp: templateResponse) => {
        this.templateData = resp.data;
      }
    })
  }
}
