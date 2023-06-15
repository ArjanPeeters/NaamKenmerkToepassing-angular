import { Naam } from './database/Naam';
import { Kenmerk } from './database/Kenmerk';
import { Toepassing } from './database/Toepassing';

export interface MaterialSelectOptions {
    naam: Naam[];
    kenmerk: Kenmerk[];
    toepassing: Toepassing[];
}
