import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCardComponent } from './type-card.component';

describe('TypeCardComponent', () => {
  let component: TypeCardComponent;
  let fixture: ComponentFixture<TypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
