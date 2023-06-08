import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.apiHost}/files`;
  constructor(private http: HttpClient, private authService: AuthService) { }


  uploadImage(files: FormData) {
    return this.http.post<any>(`${this.apiUrl}`, files)
      .pipe(catchError((error) => {
        if (error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      }));
  }

  deleteImage(id: number) {
   return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => {
        if (error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      }));
  }
}
