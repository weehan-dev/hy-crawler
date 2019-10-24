import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

export enum When {
  TODAY,
  TOMORROW,
  THREEDAYS,
  FOURDAYS,
  FIVEDAYS,
  SIXDAYS
}

export interface IDiet {
  imageUrl?: string;
  mealKor?: string;
  mealEng?: string;
  price?: string;
}

@Entity()
class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "smallint", enum: When })
  afterDay: number;

  @Column({ type: "timestamp" })
  date: string; // YYYY-MM-DD

  @Column({ type: "varchar" })
  restaurant: string;

  @Column({ type: "varchar", length: 15 })
  type: string; // 분식? 중식? 석식? ...

  @Column({ type: "text", nullable: true })
  diets: string;
}

export default Diet;
