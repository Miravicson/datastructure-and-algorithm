/**
 * A list is an ordered sequence of data. Each data item is stored in a list is called an element.
 * A list with no elements is an empty list. you can append an element to the end of a list, you can insert a element into a list
 * Elements are deleted from a list using the remove operation. You can also clear a list so that all of its current elements are removed.
 * The number of elements in a list is called the length.
 * ADT list interface
 * listSize (property) -> number of elements in a list
 * pos (property) -> Current position in the list
 * length(property) -> Returns the number of elements in the list
 * clear (function) -> clears all elements in the list
 * toString (function) -> Returns string representation of the list
 * getElement (function) -> Returns element a current postion
 * insert (function) -> Inserts new elements after existing element
 * append (function) -> Adds new element to the end of a list
 * remove (function) -> Removes element from list
 * front (function) -> Sets current position to first elemen of list
 * end (function) -> Sets current position to the last element of list
 * prev (function) -> Moves current position back one element
 * next (function) -> Moves current position forward one element
 * currPos (function) -> Returns the current position in list
 * moveTo (function) -> Moves the curren position to specified position.
 */

export interface IList<T> {
  append: (el: T) => void;
  remove: (el: T) => boolean;
}

export class List<T> implements IList<T> {
  listSize = 0;
  pos = 0;
  private dataStore: T[] = [];

  find(element: T): number {
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] === element) {
        return i;
      }
    }
    return -1;
  }

  append(element: T) {
    this.dataStore[this.listSize++] = element;
  }
  remove(element: T) {
    const foundAt = this.find(element);
    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1);
      --this.listSize;
      return true;
    }

    return false;
  }

  get length() {
    return this.listSize;
  }

  toString() {
    return this.dataStore.join(', ');
  }
  insert(element: T, after: T) {
    const insertPos = this.find(after);
    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, element);
      ++this.listSize;
      return true;
    }
    return false;
  }

  clear() {
    this.dataStore = [];
    this.listSize = 0;
    this.pos = 0;
  }
  contains(element: T): boolean {
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] === element) {
        return true;
      }
    }
    return false;
  }
  front() {
    this.pos = 0;
  }
  end() {
    this.pos = this.listSize - 1;
  }
  prev() {
    if (this.pos > 0) {
      --this.pos;
    }
  }
  next() {
    if (this.pos < this.listSize - 1) {
      ++this.pos;
    }
  }
  currPos() {
    return this.pos;
  }
  moveTo(position: number) {
    if (position >= 0 && position < this.listSize) {
      this.pos = position;
    } else {
      throw new Error('Position out of bounds');
    }
  }
  getElement() {
    return this.dataStore[this.pos];
  }
}
