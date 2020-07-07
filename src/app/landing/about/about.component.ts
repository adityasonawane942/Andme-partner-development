import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const gapi: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private data : DataService,
    private _ngZone: NgZone,
    private router: Router,
    private http: HttpClient,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token 38e461e6f3a9951556d082e535b86c6d5f1c8c20'})
    };
   }

  public user: any;
  confpass

  public name: string;
  public gID: number;
  public imageURL: string;
  public email: string;
  private url: string = "http://partnerapi.andme.in/andme/user";

  ngOnInit() {
    this.user = {
      username : '',
      password : ''
    }
  }

  httpOptions

  register() {
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.user.username)&&this.user.password==this.confpass) {
      this.http.post('http://partnerapi.andme.in/rout/users/', this.user, this.httpOptions)
        .subscribe(
          result => {
            this._ngZone.run(() => this.router.navigate(['/form']));
          },
          error => {
            try {
              var err = error.error.username
              var cerr = err[0].replace('username', 'Email ID')
              var derr = cerr.replace('.', '. Please proceed to Login')
              alert(derr)
            }
            catch(e) {
              alert(e)
            }
          }
        )
    }
    else if(this.user.password!=this.confpass) {
      alert("Passwords you entered do not match")
    }
    else {
      alert("Please enter a valid Email Address")
    }
  }

  ngAfterViewInit(){
    this.googleInit();
  }

  public auth2:any;
  public googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '471731934136-8rcme5ikt23dctp1qnv2mkp58fves9hh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      // console.log("apply client")
      this.attachSignin(document.getElementById('buttonr'));
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
          'uidg':profile.getId()
        }) );
        this.name=profile.getName();
        this.imageURL=profile.getImageUrl();
        this.email=profile.getEmail();
        // console.log("apply attach")
        this.onClick();
      });
  }

  onClick(){
    this.http.get(this.url+'/'+this.gID)
      .subscribe(
        data => {
          // console.log(data);
          this.data.setuserdata(data);
          this._ngZone.run(() => this.router.navigate(['/user/updates']));
        },
        error => {
          // console.log("to form")
          this._ngZone.run(() => this.router.navigate(['/form']));
        }
      )
  }

}
