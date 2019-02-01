import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(public chatService: ChatService) {}
  texto: string;
  mensajesSubscription: Subscription;
  mensajes: any [] = [];
  elemento: HTMLElement;
  ngOnInit() {
this.elemento = document.getElementById('chat-mensajes');
this.mensajesSubscription = this.chatService.getMensaje().subscribe(msg => {

console.log('Mensajes hasta el momento: ', this.mensajes);
this.mensajes.push(msg);

setTimeout(() => {
  this.elemento.scrollTop = this.elemento.scrollHeight;
}, 50);

});


}

ngOnDestroy() {
  this.mensajesSubscription.unsubscribe();

}

  enviar() {
    console.log(this.texto);

    this.chatService.enviarMensaje(this.texto);
    this.texto = '';
  }

}
