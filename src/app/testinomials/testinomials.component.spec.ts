import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestinomialsComponent } from './testinomials.component';

describe('TestinomialsComponent', () => {
  let component: TestinomialsComponent;
  let fixture: ComponentFixture<TestinomialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestinomialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestinomialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
