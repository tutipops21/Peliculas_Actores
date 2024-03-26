import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPeliculasComponent } from './alta-peliculas.component';

describe('AltaPeliculasComponent', () => {
  let component: AltaPeliculasComponent;
  let fixture: ComponentFixture<AltaPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltaPeliculasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
