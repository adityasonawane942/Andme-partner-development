import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery'

declare var jQuery:any;
declare var instgrm : any;

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
    this._ngZone.run(() => this.router.navigate(['/home'] ));
  }

  allposts
  tenposts = []
  products
  
  poster(link) {
    this.http.get('https://api.instagram.com/oembed?hidecaption=true&url='+link)
      .subscribe(
        post => {
          this.tenposts.push({media: post['thumbnail_url'], url: link})
          this.data.setpostdata(this.tenposts)
        },
        err => {
          alert(JSON.stringify(err))
        }
      )
}

  ngOnInit() {
    instgrm.Embeds.process()
    this.http.get('http://127.0.0.1:8000/andme/posts/')
      .subscribe(
        data => {
          this.allposts = data['data'].splice(0,12)
          for(var i of this.allposts) {
            this.poster(i.permalink)
          }
        },
        error => {
          alert(JSON.stringify(error))
        }
      )

    this.http.get('http://127.0.0.1:8000/andme/products/')
    .subscribe(
      data => {
        this.products = data['products']
        this.data.setstoredata(this.products)
      },
      error => {
        alert(JSON.stringify(error))
      }
      )
    
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

  $('body').on('mouseenter mouseleave','.nav-item',function(e){
    if ($(window).width() > 750) {
      var _d=$(e.target).closest('.nav-item');_d.addClass('show');
      setTimeout(function(){
      _d[_d.is(':hover')?'addClass':'removeClass']('show');
      },1);
    }
});	

  }

}
