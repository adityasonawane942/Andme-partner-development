import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private data: DataService,
    private router: Router,
    private _ngZone: NgZone,
    private http: HttpClient,
  ) { }
  
  public name: string;
  public imageURL: string;
  public email: string;
  public gID: number;
  private url: string = "http://127.0.0.1:8000/andme/user";

  public auth2:any;
  public googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '471731934136-8rcme5ikt23dctp1qnv2mkp58fves9hh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      console.log("login client")
      this.attachSignin(document.getElementById('button'));
    });
  }

  public attachSignin(element){
    this.auth2.attachClickHandler(element, {},
      (googleUser)=> {
        let profile=googleUser.getBasicProfile();
        this.gID=profile.getId();
        this.data.setLdata(JSON.stringify({
          'name':profile.getName(),
          'email':profile.getEmail(),
          'uid':profile.getId()
        }) );
        this.name=profile.getName();
        this.imageURL=profile.getImageUrl();
        this.email=profile.getEmail();
        console.log("login attach")
        this.onClick();
      });
  }

  onClick(){
    this.http.get(this.url+'/'+this.gID)
      .subscribe(
        data => {
          console.log(data);
          this.data.setuserdata(data)
          this._ngZone.run(() => this.router.navigate(['/user/profile']));
        },
        error => {
          alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
                  }
        )
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.googleInit();
  }

}
