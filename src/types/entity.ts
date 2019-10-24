import { DeepPartial } from "typeorm";
import Diet from "../models/entities/Diet.entity";

export type Select<T> = DeepPartial<T>

export type DietSelect = Select<Diet>