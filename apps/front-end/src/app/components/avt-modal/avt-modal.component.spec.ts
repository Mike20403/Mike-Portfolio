import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvtModalComponent } from './avt-modal.component';

describe('AvtModalComponent', () => {
  let component: AvtModalComponent;
  let fixture: ComponentFixture<AvtModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvtModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvtModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
