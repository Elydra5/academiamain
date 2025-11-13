import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgotpasswd } from './forgotpasswd';

describe('Forgotpasswd', () => {
  let component: Forgotpasswd;
  let fixture: ComponentFixture<Forgotpasswd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forgotpasswd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forgotpasswd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
