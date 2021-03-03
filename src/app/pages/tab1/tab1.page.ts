import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) {
              
  }

 async agregarLista() {

  //this.router.navigateByUrl('tabs/tab1/agregar');
   
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder:'Nombre de la lista'
      }],
      buttons: [{
        text: 'cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },{
          text: 'crear',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
           const listaId = this.deseosService.crearLista(data.titulo);
           //  this.router.navigateByUrl('tabs/tab1/agregar');
              
              this.router.navigateByUrl(`tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });

      alert.present();

 }
 


}
