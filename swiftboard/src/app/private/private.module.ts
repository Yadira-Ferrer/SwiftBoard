import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, PrivateRoutingModule, PrimengModule],
})
export class PrivateModule {}
