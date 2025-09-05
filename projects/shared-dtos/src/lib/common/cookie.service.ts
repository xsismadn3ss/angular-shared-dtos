import {inject, Injectable} from '@angular/core';

@Injectable()
export class CookieService {
  constructor() {
  }

  findCookie(name: string): string | undefined {
    return  document.cookie.split(';').
    find(row => row.startsWith(name + '='))
  }
}
