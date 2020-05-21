import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {

  constructor(
    private data: DataService
  ) { }

links = this.data.getpostdata()

  ngOnInit() { 
    if(this.links) {
      document.getElementById('one').style.display = "none"
      for(var i=0; i<10; i++) {
        document.getElementById(i.toString()).innerHTML = '<div style="border: 0px;" class="card"><img style="width: 100%; border-radius: 15px;" src="'+ this.links[i].media +'" /><a href="'+ this.links[i].url +'" target="_blank" class="stretched-link"></a></div>'
        document.getElementsByTagName('img')[i].onerror = function () {
          this.style = 'display: none;'
        };
      }
    }
    else {
      setTimeout(() => { 
        document.getElementById('one').style.display = "none"
        this.links = this.data.getpostdata()
        console.log(this.links)
        for(var i=0; i<10; i++) {
          document.getElementById(i.toString()).innerHTML = '<div style="border: 0px;" class="card"><img style="width: 100%; border-radius: 15px;" src="'+ this.links[i].media +'" /><a href="'+ this.links[i].url +'" target="_blank" class="stretched-link"></a></div>'
          document.getElementsByTagName('img')[i].onerror = function () {
            this.style = 'display: none;'
          };
        }
      }, 3000);
    }
  }

}
