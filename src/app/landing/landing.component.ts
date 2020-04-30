import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

declare var jQuery:any;

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
    private data: DataService,
  ) {}

  ngOnInit() {

    this._ngZone.run(() => this.router.navigate(['/home'] ));

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
