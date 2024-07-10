import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let sidebar: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    sidebar = fixture.debugElement.query(By.css('.sidebar'));
    fixture.detectChanges();
  });

  it('should create the sidebar component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct sidebar class initially', () => {
    expect(sidebar.nativeElement.classList).toContain('closed');
  });

  it('should toggle sidebar class on button click', () => {
    const button = fixture.debugElement.query(By.css('#toggle-button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(sidebar.nativeElement.classList.contains('closed')).toBeFalsy();

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(sidebar.nativeElement.classList).toContain('closed');
  });

  it('should have search box element', () => {
    const searchBox = fixture.debugElement.query(By.css('.search-box'));
    expect(searchBox).toBeTruthy();
  });

  it('should have menu items with links and icons', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.sidebar-menu li'));
    expect(menuItems.length).toBeGreaterThan(0);

    for (const menuItem of menuItems) {
      const icon = menuItem.query(By.css('i'));
      const link = menuItem.query(By.css('a'));

      expect(icon).toBeTruthy();
      expect(link).toBeTruthy();
    }
  });
});
