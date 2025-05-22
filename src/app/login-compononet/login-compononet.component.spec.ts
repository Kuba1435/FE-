import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCompononetComponent } from './login-compononet.component';

describe('LoginCompononetComponent', () => {
  let component: LoginCompononetComponent;
  let fixture: ComponentFixture<LoginCompononetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCompononetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCompononetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
