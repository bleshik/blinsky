import { CloneWith } from './CloneWith';

class DummyImmutableObject extends CloneWith {
    constructor(protected value: number) {
        super();
    }

    change(newValue: number) {
        return this.cloneWith((t) => t.value = newValue);
    }

    transformForDummyMethod() {
        return this.transformFor([1, 2, 3, 4], (t, val: number) => t.change(val));
    }

    getValue() {
        return this.value;
    }

}

it('cloneWith', () => {
    const dummy = new DummyImmutableObject(1);
    const changedDummy = dummy.change(42);
    expect(changedDummy.getValue()).toEqual(42);
    // dummy != changedDummy, since changedDummy is a brand new object
    expect(dummy).not.toEqual(changedDummy);
});

it('transformFor', () => {
    const dummy = new DummyImmutableObject(1);
    const changedDummy = dummy.transformForDummyMethod();
    // uses the last value in the array
    expect(changedDummy.getValue()).toEqual(4);
    // dummy != changedDummy, since changedDummy is a brand new object
    expect(dummy).not.toEqual(changedDummy);
});
