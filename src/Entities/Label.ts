import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Image } from "./Image";

@Entity()
export class Label {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany((type) => Image, (image) => image.labels)
    @JoinTable()
    public images: Image[];
}
