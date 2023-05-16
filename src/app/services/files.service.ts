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
  private authToken = this.authService.getToken();
  private generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-AuthToken': this.authToken.jwtToken || ''
    });
  }
  
  constructor(private http: HttpClient, private authService: AuthService) { }


  uploadImage(files: FormData) {
    const headers = this.generateAuthHeaders();
    const httpOptions = {
      headers
    };
    return this.http.post<any>(`${this.apiUrl}`, files, httpOptions)
      .pipe(catchError((error) => {
        if (error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      }));
  }
}
