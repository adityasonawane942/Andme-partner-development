import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare const gapi: any;

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  constructor(
    private data : DataService,
    private _ngZone: NgZone,
    private router: Router,
    private http: HttpClient,
  ) { }

  public name: string;
  public gID: number;
  public imageURL: string;
  public email: string;
  private url: string = "http://127.0.0.1:8000/andme/user";

  ngOnInit() {
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
      console.log("apply client")
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
        console.log("apply attach")
        this.onClick();
      });
  }

  onClick(){
    this.http.get(this.url+'/'+this.gID)
      .subscribe(
        data => {
          console.log(data);
          this._ngZone.run(() => this.router.navigate(['/user/profile']));
        },
        error => {
          console.log("to form")
          this._ngZone.run(() => this.router.navigate(['/form']));
        }
      )
  }

}
