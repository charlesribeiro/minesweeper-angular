import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CellComponent } from "./cell.component";
import { mockCell } from "../../../../utils/mock-cell";
import { By } from "@angular/platform-browser";

describe("CellComponent", () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellComponent],
    });
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.cell = mockCell;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render correct image path", () => {
    const imgElement = fixture.debugElement.query(By.css("img"));
    expect(imgElement.nativeElement.getAttribute("src")).toEqual(
      "/assets/MINESWEEPER_M.png",
    );
  });

  it("should emit rightClick event on right-click", () => {
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
});
