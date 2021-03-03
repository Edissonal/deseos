import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';


@Pipe({
  name: 'filtrocompletado',
  pure: false
})
export class FiltrocompletadoPipe implements PipeTransform {

  transform(Listas: Lista[], completada: boolean = true): Lista[] {
   
    return  Listas.filter(lista =>   lista.terminada === completada);
    
  }

}
