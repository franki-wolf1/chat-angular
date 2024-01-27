import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    AngularFirestoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-springboot-angular';
  constructor() {} 

  ngOnInit() { 
    AngularFireModule.initializeApp(environment.firebaseConfig);
  }
  
}

