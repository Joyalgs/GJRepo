import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private configService: ConfigService) {
    //configService.setConfig();
   }

  ngOnInit() {
  }

}
