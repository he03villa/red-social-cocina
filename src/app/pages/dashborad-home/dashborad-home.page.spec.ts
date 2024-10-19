import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboradHomePage } from './dashborad-home.page';

describe('DashboradHomePage', () => {
  let component: DashboradHomePage;
  let fixture: ComponentFixture<DashboradHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboradHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
