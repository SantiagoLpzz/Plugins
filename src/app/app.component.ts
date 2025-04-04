import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // StatusBar plugin
      if ((window as any).StatusBar) {
        (window as any).StatusBar.styleDefault();
        (window as any).StatusBar.backgroundColorByHexString('#2196F3');
      }

      // Device plugin
      if ((window as any).device) {
        const deviceInfo = (window as any).device;
        console.log('Device Info:', deviceInfo);
      }

      // Network Information plugin
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection) {
        console.log('Network Type:', connection.type);

        // Escuchar cambios en la conexión
        connection.addEventListener('change', () => {
          console.log('Connection changed to:', connection.type);
        });
      } else {
        console.log('No connection info available');
      }
    });
  }
}
