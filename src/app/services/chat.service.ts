import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) {  }


enviarMensaje(mensaje: string) {


const payload = {

de: this.wsService.getUsuario()['nombre'],
cuerpo: mensaje

};

this.wsService.emitir('mensaje', payload);

  }


 getMensaje() {

return this.wsService.escuchar('mensaje-nuevo');

 }

 getMensajePrivado() {
return this.wsService.escuchar('mensaje-privado');

 }
}
