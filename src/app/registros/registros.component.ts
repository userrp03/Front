import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Registro } from 'src/model/registro';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  displayedColumns: string[] = [ 'Id', 'Descricao', 'Despesa', 'Imagem', 'Tipo', 'DataCriacao'];
  dataSource: Registro[];

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getRegistros()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      // this.isLoadingResults = false;
    }, err => {
      console.log(err);
      // this.isLoadingResults = false;
    });
  }

}
