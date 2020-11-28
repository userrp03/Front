import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-registro-editar',
  templateUrl: './registro-editar.component.html',
  styleUrls: ['./registro-editar.component.css']
})
export class RegistroEditarComponent implements OnInit {
  id: number = null;
  registroForm: FormGroup;
  desc_registro: string = '';
  despesa_registro: string = '';
  img_registro: string = '';
  data_registro: string = '';
  tipo_registro: string = '';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getRegistro(this.route.snapshot.params['id']);
    this.registroForm = this.formBuilder.group({
      'desc_registro' : [null, Validators.required],
      'despesa_registro' : [null, Validators.required],
      'img_registro' : [null, Validators.required],
      'data_registro' : [null, Validators.required],
      'tipo_registro' : [null, Validators.required],
      // 'preco_registro' : [null, Validators.required],
    })
  }

  getRegistro(id) {
    this.api.getRegistro(id).subscribe(data => {
      this.id = data.id;
      this.registroForm.setValue({
        // id_registro: data.id,
        desc_registro: data.descricao,
        despesa_registro: data.despesa,
        img_registro: data.imagem,
        data_registro: data.dataCriacao,
        tipo_registro: data.tipo
      });
    });
  }
  
  updateRegistro(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateRegistro(this.id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/registro-detalhe/' + this.id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
