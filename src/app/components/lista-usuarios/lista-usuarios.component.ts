import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(
    public chatService: ChatService
  ) {}

  usuariosActivosObs: Observable<any>;
  ngOnInit() {
// Obtiene los usuarios Conectados
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // Llama al servidor por los Usuarios Conectados
    this.chatService.getObtenerUsuarios();

  }

}
