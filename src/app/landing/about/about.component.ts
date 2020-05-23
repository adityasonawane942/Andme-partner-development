import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    // this.httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token 38e461e6f3a9951556d082e535b86c6d5f1c8c20'})
    // };
   }

  public user: any;
  confpass

  public name: string;
  public gID: number;
  public imageURL: string;
  public email: string;
  private url: string = "http://127.0.0.1:8000/andme/user";

  ngOnInit() {
    // this.user = {
    //   username : '',
    //   email : '',
    //   password : ''
    // }
  }

  // httpOptions

  // register() {
  //   this.http.post('http://127.0.0.1:8000/users/', this.user, this.httpOptions)
  //     .subscribe(
  //       result => {
  //         console.log(result)
  //       },
  //       error => {
  //         alert(JSON.stringify(error))
  //       }
  //     )
  // }

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
      console.log("apply client")
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
          'uid':profile.getId()
        }) );
        this.name=profile.getName();
        this.imageURL=profile.getImageUrl();
        this.email=profile.getEmail();
        console.log("apply attach")
        this.onClick();
      });
  }

  onClick(){
    this.http.get(this.url+'/'+this.gID)
      .subscribe(
        data => {
          console.log(data);
          this.data.setuserdata(data);
          this._ngZone.run(() => this.router.navigate(['/user/updates']));
        },
        error => {
          console.log("to form")
          this._ngZone.run(() => this.router.navigate(['/form']));
        }
      )
  }

}
