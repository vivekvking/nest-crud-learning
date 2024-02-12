import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { createNinjaDto } from './dto/create-ninja.dto';
import { updateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor (private readonly ninjaService: NinjasService) {};
  // get ninjas []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'sword' | 'phone'){
    return this.ninjaService.getNinjas(weapon);    
  }

  // get ninjas/:id {}
  @Get(':id')
  getSingleNinja(@Param('id', ParseIntPipe) id: number){
    try{
      return this.ninjaService.getOneNinja(id);
    } catch(err){
      throw new NotFoundException();
    }
  }

  // post ninjas
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: createNinjaDto){
    return this.ninjaService.createNinja(createNinjaDto);
  } 

  // put ninjas/:id 
  @Put()
  updateNinja(@Body() updateNinjaDto: updateNinjaDto){
    return this.ninjaService.updateNinja(updateNinjaDto);
  }

  // delete ninjas/:id
  @Delete(':id') 
  deleteNinja(@Param('id', ParseIntPipe) id: number){
    return this.ninjaService.deleteNinja(id);
  }

}
