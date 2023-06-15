import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import initSqlJs, { Database } from 'sql.js';
import { AbstractDatabaseModel } from '../models/database';

const DATABASE_FILE = '/assets/database/NaamKenmerkToepassing.db';

export interface OrderBy {
    field: string;
    direction: 'ASC' | 'DESC';
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public ready = new Subject<Database>();

    private database: Database;

    constructor() {
        this.initialize().then(() => {
            this.ready.next(this.database);
        });
    }

    public query<T extends AbstractDatabaseModel>(query: string): T[] | null {
        const res = this.database.exec(query);
        if (res.length === 0) {
            return null;
        }

        const columns = res[0].columns;
        const values = res[0].values;

        if (values.length === 0) {
            return null;
        }

        return values.map((value) => this.mapModel<T>(columns, value));
    }

    public findAll<T extends AbstractDatabaseModel>(tableName: string, orderBy?: OrderBy): T[] | null {
        const query = `SELECT * FROM \`${tableName}\``;
        if (orderBy) {
            query.concat(` ORDER BY ${orderBy.field} ${orderBy.direction}`);
        }
        return this.query<T>(query);
    }

    public findBy<T extends AbstractDatabaseModel>(tableName: string, fields: Partial<T>, orderBy?: OrderBy): T[] | null {
        const query = Object.keys(fields).map((field) => `${field} = '${fields[field]}'`).join(' AND ');
        if (orderBy) {
            query.concat(` ORDER BY ${orderBy.field} ${orderBy.direction}`);
        }
        return this.query<T>(`SELECT * FROM \`${tableName}\` WHERE ${query}`);
    }

    public findOneBy<T extends AbstractDatabaseModel>(tableName: string, fields: Partial<T>, orderBy?: OrderBy): T | null {
        return this.findBy(tableName, fields)?.[0] ?? null;
    }

    public mapModel<T extends AbstractDatabaseModel>(columns: string[], values: any[]): T {
        const model = {} as T;
        columns.forEach((column, index) => model[column] = values[index]);

        return model;
    }

    private async initialize() {
        const databaseFile = await fetch(DATABASE_FILE);
        const databaseFileData = await databaseFile.arrayBuffer();
        const SQL = await initSqlJs({
            locateFile: (file) => `./assets/database/${file}`,
        });

        this.database = new SQL.Database(new Uint8Array(databaseFileData));
    }

}
