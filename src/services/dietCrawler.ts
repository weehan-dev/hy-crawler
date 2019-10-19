import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  restaurant: string;

  @Column({type: 'text', nullable: true})
  imageUrl: string;

  @Column({type: 'varchar', length: 15})
  types: string;

  @Column({type: 'varchar'})
  diet: string;

  @Column({type: 'varchar'})
  price: string;
}

export default Diet;
