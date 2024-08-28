import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifyLoaderComponent } from './email-verify-loader.component';

describe('EmailVerifyLoaderComponent', () => {
  let component: EmailVerifyLoaderComponent;
  let fixture: ComponentFixture<EmailVerifyLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerifyLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailVerifyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
