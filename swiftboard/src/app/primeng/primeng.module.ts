import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    ChipModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    InputOtpModule,
    MessagesModule,
  ],
})
export class PrimengModule {}
