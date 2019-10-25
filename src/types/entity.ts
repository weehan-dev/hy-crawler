import { DeepPartial } from "typeorm";
import Diet from "../models/entities/Diet.entity";
import Library from "../models/entities/Library.entity";

export type Select<T> = DeepPartial<T>;

export type DietSelect = Select<Diet>;
export type LibrarySelect = Select<Library>;
