import { is } from 'immutable';
import { CloneWith } from './CloneWith';
import { EqualsHashCode } from './EqualsHashCode';

const hashIt = require('hash-it');

export abstract class IdentifiedEntity<K> extends CloneWith implements EqualsHashCode {

    readonly id: K;

    equals(other: any): boolean {
        return is(this.id, other['id']);
    }

    hashCode(): number {
        return hashIt(this.id);
    }

}
