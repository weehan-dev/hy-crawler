import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'smallint'})
  year: number;

  @Column({type: 'smallint'})
  month: number;

  @Column({type: 'date'})
  startDate: Date;

  @Column({type: 'date', nullable: true})
  endDate: Date;

  @Column({type: 'smallint'})
  leftDate: number;

  @Column({type: 'varchar'})
  content: string;
}

export default Schedule;
