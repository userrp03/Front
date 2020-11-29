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
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.registro = new Registro();
    this.getRegistro(this.route.snapshot.params['id']);

    this.apiService.getRegistro(this.id)
    .subscribe(data => {
      console.log(data)
      this.registro = data;
    }, error => console.log(error));
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
