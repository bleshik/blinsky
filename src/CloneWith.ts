import keys = require("lodash/keys");
import isArray = require("lodash/isArray");
import { Iterable } from 'immutable';
/**
 * Utility base class intended for use with immutable entities.
 */
export abstract class CloneWith {

    cloneWith(mutate: (t: this) => void): this {
        const cloned: this = Object.create(this);
        keys(this).forEach((k) => cloned[k] = this[k]);
        mutate(cloned);
        return cloned;
    }

    transformFor<T>(
        items: T[] | T | Iterable<T, T> | undefined | null,
        mutateFor: (t: this, item: T) => this,
        mutateForEmpty: (t: this) => this = t => t
    ): this {
        let mutated = this;
        let empty = true;
        (Iterable.isIterable(items) || isArray(items) ? items : [items] as any).forEach((item: T) => {
            if (item) {
                mutated = mutateFor(mutated, item);
                empty = false;
            }
            return item;
        });
        return empty ? mutateForEmpty(mutated) : mutated;
    }

}
