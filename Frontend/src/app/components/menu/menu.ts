import { Component, OnInit } from '@angular/core';
import { AllMaterialsModule } from '../../all-materials.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    AllMaterialsModule,
    RouterModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu implements OnInit {

  ngOnInit(): void {}

}