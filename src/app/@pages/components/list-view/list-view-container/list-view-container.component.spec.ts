import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewContainerComponent } from './list-view-container.component';

describe('ListViewContainerComponent', () => {
  let component: ListViewContainerComponent;
  let fixture: ComponentFixture<ListViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
