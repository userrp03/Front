import { RegistrosComponent } from './../registros/registros.component';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { Registro } from 'src/model/registro';

@Component({
  selector: 'app-registro-detalhe',
  templateUrl: './registro-detalhe.component.html',
  styleUrls: ['./registro-detalhe.component.css']
})
export class RegistroDetalheComponent implements OnInit {
  // registro: Registro = { id: null, descricao: '', despesa: null, imagem: '', tipo: null, dataCriacao: null };
  @Input() registro: Registro;
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private registrosComponent: RegistrosComponent) { }

  ngOnInit(): void {
    this.getRegistro(this.route.snapshot.params['id']);
  }

  getRegistro(id) {
    this.api.getRegistro(id)
      .subscribe(data => {
        this.registro = data;
        console.log(this.registro);
        this.isLoadingResults = false;
      });
  }

  deleteRegistro(id) {
    this.isLoadingResults = true;
    this.api.deleteRegistro(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/registro']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
