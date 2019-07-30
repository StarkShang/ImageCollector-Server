import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn
} from "typeorm";
import { Label } from "./Label";

@Entity()
export class Image {
    @PrimaryColumn("text")
    public id: string;

    @Column("integer")
    public width: number;

    @Column("integer")
    public height: number;

    @Column("integer")
    public size: number;

    @Column("text")
    public space: string;

    @Column("boolean")
    public hasAlpha: boolean;

    @ManyToMany((type) => Label, (label) => label.images)
    public labels: Label[];
}
