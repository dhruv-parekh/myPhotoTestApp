import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  //reactive form for registration
  title ='ReactiveForms';
  // reactiveForm:FormGroup;
  registrationForm = new FormGroup({
    email1 : new FormControl(null, [Validators.required, Validators.email]),
    password1: new FormControl(null,[Validators.required, Validators.minLength(6)]),
    firstName1:new FormControl(null,Validators.required ),
    lastName1:new FormControl(null,Validators.required),
    phoneNumber1:new FormControl(null,[Validators.required, Validators.maxLength(21),
      ,Validators.minLength(11), Validators.pattern("\\+{1}[0-9]+")]),
    website1:new FormControl(null,[Validators.required, Validators.minLength(8)
      ,Validators.pattern("(http){1}s?(://){1}.*")])
  });

  email: string='';
  password: string='';
  firstName:string='';
  lastName:string='';
  phoneNumber:string='';
  website:string='';

   constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

    // this.reactiveForm = new FormGroup({
    //   email : new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null,Validators.required),
    //   firstName:new FormControl(null,Validators.required ),
    //   lastName:new FormControl(null,Validators.required),
    //   phoneNumber:new FormControl(null,[Validators.required, Validators.maxLength(21),
    //     ,Validators.minLength(11), Validators.pattern("\\+{1}[0-9]+")]),
    //   website:new FormControl(null,[Validators.required, Validators.minLength(8)
    //     ,Validators.pattern("(http){1}s?(://){1}.*")])
    // });

  }


  logIn() {
    console.log("user tried to login!");
    this.userService.logInUser(this.email, this.password);
    this.email="";
    this.password="";    
  }

  signUpTest(){
    console.log("user tried to sign up!",this.registrationForm);
    var name = this.firstName.trim()+" "+this.lastName.trim();
    console.log("name in signup login component= "+name);
    this.userService.signUpUser(this.email, this.password, name, this.phoneNumber, this.website);

    this.makeSignInFormVisible();
    // console.error("")
  }
  get firstName1(){
   return  this.registrationForm.get('firstName1');
  }
  get lastName1(){
    return this.registrationForm.get('lastName1');
  }
  get email1(){
    return this.registrationForm.get('email1');
  }
  get phoneNumber1(){
    return this.registrationForm.get('phoneNumber1');
  }
  get website1(){
    return this.registrationForm.get('website1');
  }
  get password1(){
    return this.registrationForm.get('password1');
  }

  // signUp() {
    
  //   var name = this.firstName.trim()+" "+this.lastName.trim();
  //   console.log("name in signup login component= "+name);
  //   this.userService.signUpUser(this.email, this.password, name, this.phoneNumber, this.website);
  // }

  logOut() {
    console.log("user tried to log out!");
    this.userService.logOutUser();
  }

  signInVisible = true;

makeSignInFormVisible(){
  this.signInVisible = true;
}

makeSignUpFormVisible(){
  this.signInVisible = false;
}

  signIn(){
    alert('cannot sign in. server busy');
  }
}
