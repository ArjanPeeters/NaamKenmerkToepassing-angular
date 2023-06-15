import { Kenmerk } from './database/Kenmerk';
import { Naam } from './database/Naam';
import { Toepassing } from './database/Toepassing';

export interface MaterialSelection {
    naam: Naam;
    kenmerk: Kenmerk;
    toepassing: Toepassing;
    reference: string;
}
