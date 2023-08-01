import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

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

  checkImageAvailability(url: string, id: string) {
    console.log('Checking image availability', url);
    return this.http.head(url, { observe: 'response' }).pipe(
      map((response) => {
        // Если получаем статус 200, значит изображение существует и доступно
        if (response.status === 200) {
          console.log('Image is available');
          return {
            data: response,
            id,
            status: 200
          };
        } else {
          // Если получаем другой статус, значит изображение не существует
          console.log('Image not found');
          return null;
        }
      }),
      catchError((error) => {
        // Обработка ошибок, если необходимо
        console.error('Error checking image availability', error);
        return of(null);
      })
    );
  }
}
