import { Injectable } from '@nestjs/common';
import { createNinjaDto } from './dto/create-ninja.dto';
import { updateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {

  private ninjas = [
    { id: 1, name: 'ninjaA', weapon: 'stars' },
    { id: 2, name: 'ninjaB', weapon: 'sword' }
  ]

  getNinjas(weapon: 'stars' | 'sword' | 'phone'){
    if(weapon){
      return this.ninjas.filter(ninja => ninja.weapon == weapon);
    }
    return this.ninjas;
  }

  getOneNinja(id: number){
    let ninja = this.ninjas.find(ninja => ninja.id == id)

    if(!ninja){
      throw new Error("ninja not found");
    }
    return ninja;
  }

  createNinja(createNinjaDto: createNinjaDto){
    let ninja = {
      ...createNinjaDto,
      id: Date.now()
    }
    this.ninjas.push(ninja);
    return ninja;
  }

  updateNinja(updateNinjaDto: updateNinjaDto){
    this.ninjas = this.ninjas.map(ninja => {
      if(ninja.id == +updateNinjaDto.id){
        return {name: updateNinjaDto.name, weapon: updateNinjaDto.weapon, id: +updateNinjaDto.id};
      }
      return ninja;
    })
    return this.getOneNinja(+updateNinjaDto.id);
  }

  deleteNinja(id: number){
    let ninja = this.getOneNinja(id);
    this.ninjas = this.ninjas.filter(ninja => ninja.id != id)
    return ninja;
  }

}
