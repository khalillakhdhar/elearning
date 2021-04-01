import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { InterviewComponent } from './interview/interview.component';
import { SessionComponent } from './session/session.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {path:"",component: ConnexionComponent},
  {path:"home",component:LayoutComponent,
children:
[
  {path:'accueil',component:AccueilComponent},
  {path:'profile',component:ProfileComponent},
  {path:'utilisateur',component:UtilisateurComponent},
  {path:'interview',component:InterviewComponent},
  {path:'session',component:SessionComponent},
  {path:'message',component:MessagerieComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
