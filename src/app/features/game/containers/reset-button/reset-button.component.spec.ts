import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResetButtonComponent } from "./reset-button.component";

describe("ResetButtonComponent", () => {
  let component: ResetButtonComponent;
  let fixture: ComponentFixture<ResetButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetButtonComponent],
    });
    fixture = TestBed.createComponent(ResetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("icon getter", () => {
    it("should return 😎 when gameStatus is WON", () => {
      component.gameStatus = component.GAMESTATUS.WON;
      expect(component.icon).toBe("😎");
    });

    it("should return 😵 when gameStatus is LOST", () => {
      component.gameStatus = component.GAMESTATUS.LOST;
      expect(component.icon).toBe("😵");
    });

    it("should return 🙂 when gameStatus is any other value", () => {
      component.gameStatus = component.GAMESTATUS.IN_PROGRESS;
      expect(component.icon).toBe("🙂");
    });
  });

  describe("resetAndPreventDefault", () => {
    it("should emit rightClick event on right-click and prevent default button action of navigation", () => {
      jest.spyOn(component.rightClick, "emit");
      component.rightClick.emit = jest.fn();
      component.resetAndPreventDefault();

      expect(component.rightClick.emit).toHaveBeenCalled();
    });
  });
});
