import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() linkClicked = new EventEmitter<string>();

  onLinkClick(route: string) {
    this.linkClicked.emit(route);
  }
}
