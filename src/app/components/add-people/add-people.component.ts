import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { People } from '../../models/people';
import { PeoplesService } from '../../services/peoples.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit, OnChanges {

  //public people: People = new People();

  constructor(private peoplesService: PeoplesService, private cd: ChangeDetectorRef,  private router:Router) { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {
    this.peoplesService.people = {
      name: '',
      biography: '',
      heroe: '',
      nuevo: true
    };
  }

  sendPeople() {
    if(this.peoplesService.people.nuevo == true){
    this.peoplesService.addPeople(this.peoplesService.people);
    }
    else  {
      this.peoplesService.updtaePeople(this.peoplesService.people);
    }
    this.cd.detectChanges();
    this.router.navigate(['peoples']);
  }

}
