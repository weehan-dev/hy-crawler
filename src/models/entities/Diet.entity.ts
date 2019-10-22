import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm';

export enum When {
  TODAY,
  TOMORROW,
  THREEDAYS,
  FOURDAYS,
  FIVEDAYS,
  SIXDAYS
}

export interface IDiet {
  imageUrl: string;
  mealKor: string;
  mealEng: string;
  price: number;
}

@Entity()
class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({type: 'smallint', enum: When})
  afterDay: number;

  @Column({type: 'varchar'})
  restaurant: string;

  @Column({type: 'varchar', length: 15})
  types: string; // 분식? 중식? 석식? ...

  @Column({type: 'json', nullable: true})
  diets: IDiet[];
}

export default Diet;
