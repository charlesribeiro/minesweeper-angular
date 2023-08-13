import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SevenSegmentDisplayComponent } from "./seven-segment-display.component";

describe("RemainingFlagsComponent", () => {
  let component: SevenSegmentDisplayComponent;
  let fixture: ComponentFixture<SevenSegmentDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SevenSegmentDisplayComponent],
    });
    fixture = TestBed.createComponent(SevenSegmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("formatNumber", () => {
    it("should format numbers less than 1000 with leading zeros", () => {
      component.value = 5;
      component.formatNumber();
      expect(component.display).toBe("005");
    });

    it("should format numbers with three digits unchanged", () => {
      component.value = 123;
      component.formatNumber();
      expect(component.display).toBe("123");
    });

    it('should display "EEE" for numbers 1000 or more', () => {
      component.value = 1000;
      component.formatNumber();
      expect(component.display).toBe("EEE");
    });

    it('should display "EEE" for negative numbers', () => {
      component.value = -5;
      component.formatNumber();
      expect(component.display).toBe("EEE");
    });
  });

  describe("ngOnChanges", () => {
    it("should call formatNumber when input changes", () => {
      jest.spyOn(component, "formatNumber");
      component.ngOnChanges();
      expect(component.formatNumber).toHaveBeenCalled();
    });
  });
});
