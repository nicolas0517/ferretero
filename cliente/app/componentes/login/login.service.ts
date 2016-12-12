import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
 
export class User {
  constructor(
    public email: string,
    public password: string) { }
}
 
var users = [
  new User('david','1234'),
  new User('sergio','1234'),
  new User('ximena','1234'),
  new User('laura','1234')
];
 
@Injectable()
export class LoginService {
 
  constructor(
    private _router: Router){}
 
  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
  }
 
  login(user){
    var authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem("user", authenticatedUser+"");
      this._router.navigate(['/']);      
      return true;
    }
    return false;
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['login']);
    }
  } 
}