import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

declare var jQuery:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loggedin = false;
  userdata
  gID
  url = "http://127.0.0.1:8000/andme/user" 

  constructor(
    private _ngZone: NgZone,
    private router: Router,
    private data: DataService,
    private http: HttpClient,
  ) {}

  logout() {
    localStorage.removeItem('ldata');
    console.log("loggedout")
    this._ngZone.run(() => this.router.navigate(['/home'] ));
  }

  ngOnInit() {

    this.gID = JSON.parse(this.data.getLdata()).uid
    this.http.get(this.url+'/'+this.gID)
    .subscribe(
      data => {
        this.userdata = data
        this.data.setuserdata(data)
      },
      error => {
        alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
      }
    )

    if(this.data.getLdata()) {
      this.loggedin = true;
    }

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

  }

}
