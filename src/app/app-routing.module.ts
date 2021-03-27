import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path:"",component: ConnexionComponent},
  {path:"home",component:LayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
