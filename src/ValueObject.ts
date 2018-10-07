import isEqual = require('lodash/isEqual');
import pickBy = require('lodash/pickBy');
import isUndefined = require('lodash/isUndefined');
import { EqualsHashCode } from './EqualsHashCode';
import { CloneWith } from './CloneWith';

const hashIt = require('hash-it');

export abstract class ValueObject extends CloneWith implements EqualsHashCode {

    equals(other: any): boolean {
        return isEqual(pickBy(this, v => !isUndefined(v)), pickBy(other, v => !isUndefined(v)));
    }

    hashCode(): number {
        return hashIt(this);
    }

}
