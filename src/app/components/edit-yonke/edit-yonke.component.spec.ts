import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditYonkeComponent } from './edit-yonke.component';

describe('EditYonkeComponent', () => {
  let component: EditYonkeComponent;
  let fixture: ComponentFixture<EditYonkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditYonkeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditYonkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
