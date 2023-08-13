import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SaveAndLoadComponent } from "./save-and-load.component";

describe("SaveAndLoadComponent", () => {
  let component: SaveAndLoadComponent;
  let fixture: ComponentFixture<SaveAndLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveAndLoadComponent],
    });
    fixture = TestBed.createComponent(SaveAndLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
