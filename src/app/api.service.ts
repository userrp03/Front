import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Registro } from 'src/model/registro';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/v1/receitaDespesaservice/lista';
// const apiUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(apiUrl)
      .pipe(
        tap(Registros => console.log('leu os Registros')),
        catchError(this.handleError('getRegistros', []))
      );
  }

  getRegistro(id: number): Observable<Registro> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Registro>(url).pipe(
      tap(_ => console.log(`leu o registro id=${id}`)),
      catchError(this.handleError<Registro>(`getregistro id=${id}`))
    );
  }

  addRegistro (Registro): Observable<Registro> {
    return this.http.post<Registro>(apiUrl, Registro, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((Registro: Registro) => console.log(`adicionou o registro com w/ id=${Registro._id}`)),
      catchError(this.handleError<Registro>('addRegistro'))
    );
  }

  updateRegistro(id, Registro): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Registro, httpOptions).pipe(
      tap(_ => console.log(`atualiza o registro com id=${id}`)),
      catchError(this.handleError<any>('updateRegistro'))
    );
  }

  deleteRegistro (id): Observable<Registro> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<Registro>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o registro com id=${id}`)),
      catchError(this.handleError<Registro>('deleteRegistro'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}