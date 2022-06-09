import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingactionComponent } from './settingaction.component';

describe('SettingactionComponent', () => {
  let component: SettingactionComponent;
  let fixture: ComponentFixture<SettingactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
