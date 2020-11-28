import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDetalheComponent } from './registro-detalhe.component';

describe('RegistroDetalheComponent', () => {
  let component: RegistroDetalheComponent;
  let fixture: ComponentFixture<RegistroDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
