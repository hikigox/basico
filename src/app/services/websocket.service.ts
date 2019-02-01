import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario = null;
  constructor(private socket: Socket) {

    this.checkStatus();
    this.getUsuarioStorage();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');

      const  payload = {
      de : this.getUsuario().nombre,
      cuerpo : 'Se ah conectado'

      };
      this.emitir('mensaje', payload);
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado del servidor');

      this.socketStatus = false;
    });
  }

  emitir(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
    console.log('Emitiendo', evento);

  }

  escuchar(evento: string) {

  return this.socket.fromEvent(evento);

  }

  loginWS(nombre: string) {
    console.log('Configurando', nombre);


    return new Promise ((resolve, reject) => {
      this.emitir('configurar-usuario', {nombre}, (resp) => {
        console.log(resp);
        this.usuario = new Usuario(nombre);
        this.usuarioStorage();
        resolve();
        } );

    });


  }

  getUsuario() {
    return this.usuario;
  }

  usuarioStorage() {
  localStorage.setItem('usuario', JSON.stringify(this.usuario));


  }
  getUsuarioStorage() {
    if (localStorage.getItem('usuario')) {
  this.usuario =  JSON.parse(localStorage.getItem('usuario'));
    this.loginWS(this.usuario.nombre);
    }

  }

}
