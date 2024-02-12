import { IsEnum, MaxLength, MinLength } from "class-validator";

export class createNinjaDto {
  @MinLength(3)
  name : string;
  @IsEnum(['sword', 'stars'], { message: "please enter correct weapon"})
  weapon: string;
}