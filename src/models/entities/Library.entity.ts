import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

/**
 * 열람실 좌석 정보
 * 10 분에 한 번씩?
 */

@Entity()
class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "varchar", length: 30 })
  location: string;

  @Column({ type: "smallint" })
  wholeSeat: number;

  @Column({ type: "smallint" })
  usingSeat: number;

  @Column({ type: "smallint" })
  leftSeat: number;

  @Column({ type: "double precision" })
  usagePercentage: number;
}

export default Library;
