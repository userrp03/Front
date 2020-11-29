import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Registro } from 'src/model/registro';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };
const httpOptions = {
  headers: new HttpHeaders({   
            // res.header("Access-Control-Allow-Origin", "*");
            // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
})
};
// const apiUrl = 'http://localhost:8080/receitaDespesaservice/';
// const apiUrl = 'http://localhost:8080/v1/receitaDespesaservice/';
// const apiUrl = 'http://localhost:8080/';

// const proxyurl = "http://localhost:8080/";
// const apiUrl = "http://localhost:4200/receitaDespesaservice/"; // site that doesn’t send Access-Control-*
// fetch(proxyurl + apiUrl) // https://cors-anywhere.herokuapp.com/https://example.com
// .then(response => response.text())
// .then(contents => console.log(contents))
// .catch(() => console.log("Can’t access " + apiUrl + " response. Blocked by browser?"))


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/v1/receitaDespesaservice/';
  
  constructor(private http: HttpClient) { }

  // getRegistros(): Observable<Registro[]> {
  //   return this.http.get<Registro[]>(baseUrl, httpOptions)
  //     .pipe(
  //       tap(Registros => console.log('leu os Registros')),
  //       catchError(this.handleError('getRegistros', []))
  //     );
  // }

  getRegistros(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
    
  }

  getRegistro(id: number): Observable<Registro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Registro>(url).pipe(
      tap(_ => console.log(`leu o registro id=${id}`)),
      catchError(this.handleError<Registro>(`getregistro id=${id}`))
    );
  }

  // addRegistro (Registro): Observable<Registro> {
  //   return this.http.post<Registro>(this.baseUrl, Registro, httpOptions).pipe(
  //     // tslint:disable-next-line:no-shadowed-variable
  //     tap((Registro: Registro) => console.log(`adicionou o registro com w/ id=${Registro.id}`)),
  //     catchError(this.handleError<Registro>('addRegistro'))
  //   );
  // }

  createRegistro(registro: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, registro);
  }

  updateRegistro(id, Registro): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, Registro, httpOptions).pipe(
      tap(_ => console.log(`atualiza o registro com id=${id}`)),
      catchError(this.handleError<any>('updateRegistro'))
    );
  }

  deleteRegistro(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => console.log(`remove o registro com id=${id}`)),
      catchError(this.handleError<any>('deleteRegistro'))
    );
  }

  // deleteRegistro (id): Observable<Registro> {
  //   const url = `${this.baseUrl}${id}`;

  //   return this.http.delete(url, httpOptions).pipe(
  //     tap(_ => console.log(`remove o registro com id=${id}`)),
  //     catchError(this.handleError<any>('deleteRegistro'))
  //   );
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}