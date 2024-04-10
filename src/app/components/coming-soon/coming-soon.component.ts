import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-coming-soon',
    standalone: true,
    templateUrl: './coming-soon.component.html',
    styleUrl: './coming-soon.component.scss',
    imports: [NavbarComponent]
})
export class ComingSoonComponent {

}
