import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  onBackdropClick(): void {
    this.closeMenu.emit();
  }

  get exibirBackdrop(): boolean {
    return this.isOpen;
  }
}
