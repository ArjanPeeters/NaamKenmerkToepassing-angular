import { AbstractDatabaseModel } from './AbstractDatabaseModel';

export interface KleurRal extends AbstractDatabaseModel {
    nummer: string;
    r: number;
    g: number;
    b: number;
    omschrijving?: string;
}
