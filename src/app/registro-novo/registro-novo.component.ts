import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-registro-novo',
  templateUrl: './registro-novo.component.html',
  styleUrls: ['./registro-novo.component.css']
})
export class RegistroNovoComponent implements OnInit {

  registroForm: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
        'Id': [null, Validators.required],
        'Descricao': [null, Validators.required, Validators.minLength(4)],
        'Despesa': [null, Validators.required],
        'Imagem': [null, Validators.required],
        'Tipo': [null, Validators.required],
        'DataCriacao': [null, Validators.required],
    });
  }

  addRegistro(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addRegistro(form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/registro-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
