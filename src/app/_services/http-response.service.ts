import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseService {

  response: { status: boolean, message: string } = {status: false, message: ''};
  constructor() { }
}
