import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BusquedaComponent } from './busqueda.component';

describe('BusquedaComponent', () => {
  let component: BusquedaComponent;
  let fixture: ComponentFixture<BusquedaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BusquedaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
