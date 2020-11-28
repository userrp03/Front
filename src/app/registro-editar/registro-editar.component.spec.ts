import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEditarComponent } from './registro-editar.component';

describe('RegistroEditarComponent', () => {
  let component: RegistroEditarComponent;
  let fixture: ComponentFixture<RegistroEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
