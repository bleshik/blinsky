[![Build Status](https://travis-ci.org/bleshik/blinsky.svg?branch=master)](https://travis-ci.org/bleshik/blinsky)
# blinsky
![](https://s3-eu-west-1.amazonaws.com/bleshik/Blinsky+Small.png "Стопка блинов")

Utility classes for functional programming in JS. The goal is to make creation of immutable classes easier.

## Why is it called 'blinsky'?
Do you know what the hardest part of software development is? Naming variables? Nope, naming npm packages! All reasonable names on npm.js are taken already, this is why this library's name is a transcription of a russian word "блинский".

## How to use it
This library defines three main abstract classes.
1. CloneWith
It basically defines a method replicating Scala's copy method. Usage example (written in TypeScript):
```
import { CloneWith } from 'blinsky';
class ImmutableHouse extends CloneWith {
    constructor(
        readonly address: string,
        protected owner: string
    ) {
        super();
    }
    buy(newOwner: string): ImmutableHouse {
        return this.cloneWith((house) => {
            house.owner = newOwner;
        });
    }
    getOwner(): string {
        return this.owner;
    }
}

const house = new ImmutableHouse("Street", "Owner");
const updatedHouse = house.buy("New Owner");
house.getOwner() + " vs " + updatedHouser.getOwner(); // Owner vs New Owner
```
Also there is another utility method for performing identical operations using a set of input data. Example usage (TypeScript, as well):
```
import { CloneWith } from 'blinsky';
import { Set } from 'immutable';
class ImmutableHouse extends CloneWith {
    constructor(
        readonly address: string,
        protected furniture: Set<string> = Set()
    ) {
        super();
    }
    addFurniture(furnitureItem: string): ImmutableHouse {
        return this.cloneWith((house) => {
            house.furniture = house.furniture.add(furnitureItem);
        });
    }
    getFurniture(): Set<string> {
        return this.furniture;
    }
}

const house = new ImmutableHouse("Street");
const updatedHouse = house.transformFor(
    Set.of("Table", "Chair"),
    (house, furnitureItem) => house.addFurniture(furnitureItem)
);
house.getFurniture() + " vs " + updatedHouser.getFurniture(); // [] vs ["Table", "Chair"]
```
2. ValueObject
This is basically the same as `CloneWith`, but it also declares "equals" and "hashCode" methods to make it work nicely with [Immutable.js](https://github.com/facebook/immutable-js/). These methods uses all the objects' fields to check for equality and compute the hash code. Refer [DDD's value object for more info](https://martinfowler.com/bliki/ValueObject.html). Usage is exactly same as with CloneWith, just use ValueObject instead of CloneWith.
3. IdentifiedEntity
Same as ValueObject, except it uses only object's identifier for checking the equality and computing hash code. Refer [DDD's entity for more info](https://enterprisecraftsmanship.com/2016/01/11/entity-vs-value-object-the-ultimate-list-of-differences/). Usage is exactly same as with CloneWith, just use IdentifiedEntity instead of CloneWith.
