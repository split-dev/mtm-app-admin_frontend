import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricsComponent } from './fabrics.component';

describe('FabricsComponent', () => {
  let component: FabricsComponent;
  let fixture: ComponentFixture<FabricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
