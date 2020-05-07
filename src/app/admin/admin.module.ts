import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, MaterialModule, AdminRoutingModule],
})
export class AdminModule {}
