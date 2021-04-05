import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { LayoutComponent } from './layout/layout.component';
import { HeadComponent } from './layout/head/head.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { InterviewComponent } from './interview/interview.component';
import { SessionComponent } from './session/session.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { AccueilComponent } from './accueil/accueil.component';



//database
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    LayoutComponent,
    HeadComponent,
    SidebarComponent,
    FooterComponent,
    ProfileComponent,
    InterviewComponent,
    SessionComponent,
    UtilisateurComponent,
    MessagerieComponent,
    AccueilComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
