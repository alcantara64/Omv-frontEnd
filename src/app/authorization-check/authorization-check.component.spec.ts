import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationCheckComponent } from './authorization-check.component';

describe('AuthorizationCheckComponent', () => {
  let component: AuthorizationCheckComponent;
  let fixture: ComponentFixture<AuthorizationCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
