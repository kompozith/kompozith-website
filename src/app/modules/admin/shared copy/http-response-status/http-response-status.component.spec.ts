import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpResponseStatusComponent } from './http-response-status.component';

describe('HttpResponseStatusComponent', () => {
  let component: HttpResponseStatusComponent;
  let fixture: ComponentFixture<HttpResponseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpResponseStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpResponseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
