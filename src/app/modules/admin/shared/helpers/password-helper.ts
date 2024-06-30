import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";

@Injectable()
export class PasswordHeleper {
    pwdMinLength: number = 8;
    pwdPattern = Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?&$*,.';+-@#\$%\^&\*])(?=.{8,})/);
}