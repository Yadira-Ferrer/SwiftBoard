import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, AuthRoutingModule, PrimengModule],
})
export class AuthModule {}
