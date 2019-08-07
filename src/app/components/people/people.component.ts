import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "../../../../node_modules/@angular/router";
import { PeoplesService } from "../../services/peoples.service";
import { HomeService } from '../../services/home.service';
import { People } from 'src/app/models/people';

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.css"]
})
export class PeopleComponent implements OnInit {

  //public people: any;
  //public people: People = new People();

  constructor(
    private activateRoute: ActivatedRoute,
    private peoplesService: PeoplesService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
     this.activateRoute.params.subscribe(({ id }) => {
       this.peoplesService.getPeopleById(id).subscribe(data => {
        this.peoplesService.people = data;
       });
     });
    this.homeService.setActiveNav(true);
  }
}
