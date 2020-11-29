import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Registro } from 'src/model/registro';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  registros: Observable<Registro[]>;

  displayedColumns: string[] = [ 'Id', 'Descricao', 'Despesa', 'Imagem', 'Tipo', 'DataCriacao', 'Editar', 'Deletar','Atualizar'];
  dataSource: Registro[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.reloadData();
    this.api.getRegistros()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      // this.isLoadingResults = false;
    }, err => {
      console.log(err);
      // this.isLoadingResults = false;
    });
  }

  deleteRegistro(id: number) {
    this.api.deleteRegistro(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  reloadData() {
    this.registros = this.api.getRegistros();
  }
}
