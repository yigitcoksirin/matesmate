import { Component } from '@angular/core';
import { DummyPet, dummyPets } from '../../models/dummy-pets';

@Component({
  selector: 'pets-list',
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.css'
})
export class PetsListComponent {
  pets:DummyPet[] = [];

  ngOnInit():void {
    this.pets = dummyPets;
  }
}
