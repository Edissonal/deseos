import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList) lista: IonList;

  constructor(public deseosService: DeseosService,
  private router: Router,
  private alertCtrl:AlertController) { }

  listaseleccionada(lista: Lista) {
    console.log(lista);
    if (this.terminada) {
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`); 
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`); 
    }
  
   }

  borrarlista(lista:Lista) {
    this.deseosService.borrarlista(lista);

  }
  
  async editarLista(lista: Lista) {
   
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder:'Nombre de la lista'
      }],
      buttons: [{
        text: 'cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
          this.lista.closeSlidingItems();
        }
      },{
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

      alert.present();
    
  }

  ngOnInit() {}

}
