import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNovoComponent } from './registro-novo.component';

describe('RegistroNovoComponent', () => {
  let component: RegistroNovoComponent;
  let fixture: ComponentFixture<RegistroNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroNovoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
