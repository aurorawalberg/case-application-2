import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { DataFeatureKey } from '../store/data.store.model';
import { dataReducer } from '../store/reducers/data.reducer';

@NgModule({
  declarations: [PagesComponent, EditOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(DataFeatureKey, dataReducer),
    StoreModule.forRoot({}),
  ],
  exports: [PagesComponent],
})
export class PagesModule {}
