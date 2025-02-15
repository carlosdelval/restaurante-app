import { ComponentFixture, TestBed } from '@angular/core/testing';

import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listado-platos',
  templateUrl: './listado-platos.component.html',
  styleUrls: ['./listado-platos.component.scss'],
  animations: [
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ListadoPlatosComponent {}


describe('ListadoPlatosComponent', () => {
  let component: ListadoPlatosComponent;
  let fixture: ComponentFixture<ListadoPlatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPlatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
