import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { PrimengModule } from '../primeng/primeng.module';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';

@NgModule({
  declarations: [LayoutComponent, LoginComponent, OtpComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, PrimengModule],
})
export class AuthModule {}
