import { Component, OnInit } from '@angular/core';
import { AllMaterialsModule } from '../../all-materials.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    AllMaterialsModule,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  ngOnInit(): void {}

}