import { Component } from '@angular/core';
import { NavmenuComponent } from "../core/shared/navmenu-component/navmenu-component";
import { MainPanel } from "../core/shared/main-panel/main-panel";

@Component({
  selector: 'app-layout-component',
  imports: [NavmenuComponent, MainPanel],
  standalone: true,
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss'
})
export class LayoutComponent {

}
