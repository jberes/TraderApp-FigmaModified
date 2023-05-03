import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxInputGroupModule, IgxIconModule, IgxChipsModule, IgxListModule, IgxCategoryChartModule, IgxButtonModule, IgxRippleModule, IgxGridModule } from 'igniteui-angular';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [ NoopAnimationsModule, FormsModule, HttpClientTestingModule, IgxInputGroupModule, IgxIconModule, IgxChipsModule, IgxListModule, IgxCategoryChartModule, IgxButtonModule, IgxRippleModule, IgxGridModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
