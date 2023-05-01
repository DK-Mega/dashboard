import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';
import { RouterModule } from '@angular/router';
import { MAIN_ROUTES } from './main.routes';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MAIN_ROUTES)
  ]
})
export class MainModule { }
