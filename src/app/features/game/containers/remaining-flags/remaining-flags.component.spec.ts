import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RemainingFlagsComponent } from "./remaining-flags.component";

describe("RemainingFlagsComponent", () => {
  let component: RemainingFlagsComponent;
  let fixture: ComponentFixture<RemainingFlagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemainingFlagsComponent],
    });
    fixture = TestBed.createComponent(RemainingFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
