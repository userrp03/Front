import { Registro } from 'src/model/registro';
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
  registroForm: FormGroup;
  registro: Registro = new Registro();

  id: number = null;
  // registroForm: FormGroup;
  desc_registro: string = '';
  despesa_registro: string = '';
  img_registro: string = '';
  data_registro: string = '';
  tipo_registro: string = '';
  isLoadingResults = false;

  apiService: any;
  submitted = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registro = new Registro();

    this.id = this.route.snapshot.params['id'];
    
    this.api.getRegistro(this.id)
      .subscribe(data => {
        console.log(data)
        this.registro = data;
      }, error => console.log(error));

    this.getRegistro(this.route.snapshot.params['id']);
    this.registroForm = this.formBuilder.group({
      'Id': [null, Validators.required],
      'Descricao': [null, Validators.required, Validators.minLength(4)],
      'Despesa': [null, Validators.required],
      'Imagem': [null, Validators.required],
      'Tipo': [null, Validators.required],
      'DataCriacao': [null, Validators.required],
  });
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
  save() {
    console.log("teste");
   
    this.api.createRegistro(this.registro)
      .subscribe(data => console.log(data), error => console.log(error));
    this.registro = new Registro();
    console.log();
  }

  onSubmit() {
    console.log("onSubmit");
    this.submitted = true;
    this.save();
  }
}
