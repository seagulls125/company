import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTableComponent } from './company-table.component';
import { CompanyService } from '../company.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompanyTableComponent', () => {
  let component: CompanyTableComponent;
  let fixture: ComponentFixture<CompanyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTableComponent ],
      providers : [
        { provide : CompanyService }
      ],
      imports : [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one company list',async(() => {
    if (component.company_data)
      expect(component.company_data.length).toEqual(1);
  }));

  it('should have one list',async() => {
    if (component.stock_data)
      expect(component.stock_data.length).toBeGreaterThan(1);
  });
  
});
