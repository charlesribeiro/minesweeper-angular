import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CellComponent } from "./cell.component";
import { mockCell } from "../../../../utils/mock-cell";

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
});
