import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from "@angular/core/testing";

import { CellComponent } from "./cell.component";
import { mockCell } from "../../../../utils/mock-cell";
import { By } from "@angular/platform-browser";
import { MockAnimationDriver } from "@angular/animations/browser/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AnimationDriver } from "@angular/animations/browser";
import { DebugElement } from "@angular/core";

describe("CellComponent", () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let imgElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [{ provide: AnimationDriver, useClass: MockAnimationDriver }],
      declarations: [CellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.cell = mockCell;
    imgElement = fixture.debugElement.query(By.css("img"));

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render correct image path", () => {
    expect(imgElement.nativeElement.getAttribute("src")).toEqual(
      "/assets/images/MINESWEEPER_M.png",
    );
  });

  it("should emit rightClick event on right-click and prevent default action of context menu", () => {
    jest.spyOn(component.rightClick, "emit");
    component.rightClick.emit = jest.fn();
    component.addFlagAndPreventDefaultContextMenu();

    expect(component.rightClick.emit).toHaveBeenCalledWith(mockCell);
  });

  it("should emit leftClick event on left-click", () => {
    jest.spyOn(component.leftClick, "emit");
    component.leftClick.emit = jest.fn();
    component.clickOnMine();

    expect(component.leftClick.emit).toHaveBeenCalledWith(mockCell);
  });

  it("should apply fadeIn animation", fakeAsync(() => {
    expect(imgElement.classes["ng-trigger-fadeIn"]).toBeTruthy();
  }));

  it('should emit leftClick event when "F" key is pressed', () => {
    jest.spyOn(component.leftClick, "emit");
    const event = new KeyboardEvent("keydown", {
      keyCode: component.keyF,
    });
    component.navigateWithKeyboard(event);

    expect(component.leftClick.emit).toHaveBeenCalledWith(component.cell);
  });

  it('should emit rightClick event when "M" key is pressed', () => {
    jest.spyOn(component.rightClick, "emit");
    const event = new KeyboardEvent("keydown", {
      keyCode: component.keyM,
    });
    component.navigateWithKeyboard(event);

    expect(component.rightClick.emit).toHaveBeenCalledWith(component.cell);
  });

  it("should not emit any event when any other key is pressed", () => {
    jest.spyOn(component.leftClick, "emit");
    jest.spyOn(component.rightClick, "emit");
    const event = new KeyboardEvent("keydown", {
      keyCode: 99,
    });
    component.navigateWithKeyboard(event);

    expect(component.leftClick.emit).not.toHaveBeenCalled();
    expect(component.rightClick.emit).not.toHaveBeenCalled();
  });
});
