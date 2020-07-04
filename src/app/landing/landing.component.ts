import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery'

declare var jQuery:any;

declare const gapi: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  loggedin = false;

  constructor(
    private _ngZone: NgZone,
    private router: Router,
    public data: DataService,
    private http: HttpClient
  ) {}

  public name: string;
  public gID: number;
  usertoken
  public imageURL: string;
  public email: string;
  private url: string = "http://partnerapi.andme.in/andme/user";

  logout() {
    localStorage.removeItem('ldata');
    console.log("loggedout")
    this.loggedin = false
    this._ngZone.run(() => this.router.navigate(['/home'] ));
  }

  public user: any;

  login() {
    this.data.login({'username': this.user.username, 'password': this.user.password});
  }

  refreshToken() {
    this.data.refreshToken();
  }
 
  logoutnorm() {
    this.data.logout();
    localStorage.removeItem('nldata')
    console.log("loggedout")
    this.loggedin = false
    this._ngZone.run(() => this.router.navigate(['/home'] ));
  }

  ngOnInit() {
    if(this.data.getLdata()||this.data.getnldata()) {
      this._ngZone.run(() => this.router.navigate(['/user/updates']));
      this.loggedin = true;
      try {
        this.gID = JSON.parse(this.data.getLdata()).uidg
      }
      catch {
        this.usertoken = JSON.parse(this.data.getnldata()).uidn
      }
    }
    this.user = {
      username: '',
      password: ''
    };

    $(document).ready(function(){
      var w_w = $(window).width();
      if(w_w < 767){
        $("#linkpro").show()
        $("#linkout").show();
        $("#drop").hide();
      }
      else {
        $("#linkpro").hide()
        $("#linkout").hide();
        $("#drop").show();
      }
      $(window).resize(function(){
      var w_w = $(window).width();
      if(w_w < 767){
        $("#linkpro").show()
        $("#linkout").show();
        $("#drop").hide();
      }
      else {
        $("#linkpro").hide()
        $("#linkout").hide();
        $("#drop").show();
      }
      });
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    //anim
  (function($) { "use strict";

  $(function() {
    var header = $(".start-style");
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
    
      if (scroll >= 10) {
        header.removeClass('start-style').addClass("scroll-on");
      } else {
        header.removeClass("scroll-on").addClass('start-style');
      }
    });
  });	
  $(document).ready(function() {
    $('body.hero-anime').removeClass('hero-anime');
  });
  $('body').on('mouseenter','.nav-item',function(e){
      if ($(window).width() > 750) {
        var _d=$(e.target).closest('.nav-item');
        _d.addClass('show');
        setTimeout(function(){
        _d[_d.is(':hover')?'addClass':'removeClass']('show');
        },1);
      }
  });	
  })(jQuery); 
  //anim

  $('body').on('mouseenter mouseleave','.nav-item',function(e){
    if ($(window).width() > 750) {
      var _d=$(e.target).closest('.nav-item');_d.addClass('show');
      setTimeout(function(){
      _d[_d.is(':hover')?'addClass':'removeClass']('show');
      },1);
    }
});	

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
          'uidg':profile.getId()
        }));
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
          alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
        }
      )
  }

}
