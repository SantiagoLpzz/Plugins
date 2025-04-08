import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage implements OnInit {
  deviceInfo: any = {};
  networkType: string = 'unknown';

  constructor() {}

  async ngOnInit() {
    await this.setStatusBar();
    await this.getDeviceInfo();
    this.listenToNetworkChanges();
  }

  async setStatusBar() {
    try {
      await StatusBar.setBackgroundColor({ color: '#2196F3' });
      await StatusBar.setStyle({ style: Style.Default });
    } catch (err) {
      console.warn('StatusBar plugin may not be available', err);
    }
  }

  async getDeviceInfo() {
    try {
      this.deviceInfo = await Device.getInfo();
      console.log('Device Info:', this.deviceInfo);
    } catch (err) {
      console.warn('Device plugin may not be available', err);
    }
  }

  listenToNetworkChanges() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (connection) {
      this.networkType = connection.type || 'unknown';
      connection.addEventListener('change', () => {
        this.networkType = connection.type;
        console.log('Network type changed:', this.networkType);
      });
    }
  }
}
