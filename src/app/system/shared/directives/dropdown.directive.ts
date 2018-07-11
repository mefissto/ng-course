import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
	selector: '[appDropdown]'
})
export class DropDownDirective {
	@HostBinding('class.open') isOpen = false;

	@HostListener('click') onClick() {
		this.isOpen = !this.isOpen;
	}
}