import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { 
  IonApp, 
  IonContent, 
  IonButton,
  IonSpinner
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    IonApp,
    IonContent,
    IonButton,
    IonSpinner
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private http = inject(HttpClient);
  
  protected readonly backendMessage = signal<string>('');
  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string>('');

  fetchFromBackend() {
    this.loading.set(true);
    this.error.set('');
    
    this.http.get('http://localhost:3000', { responseType: 'text' })
      .subscribe({
        next: (message) => {
          this.backendMessage.set(message);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error calling backend:', err);
          this.error.set('Failed to connect to backend. Make sure it\'s running on port 3000.');
          this.loading.set(false);
        }
      });
  }
}
