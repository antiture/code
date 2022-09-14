using System;
using System.Collections;
using System.Collections.Generic;

namespace RefactoringGuru.DesignPatterns.IteratorNotes.Conceptual
{
    #region Iterator 
    abstract class AIterator : IEnumerator
    {
        object IEnumerator.Current => Current();
        public abstract int Key();
        public abstract object Current();
        public abstract bool MoveNext();
        public abstract void Reset();
    }

    class Iterator : AIterator
    {
        private Collection Collection;
        private int Position = -1;
        private bool Reverse = false;

        public Iterator(Collection Collection, bool Reverse = false)
        {
            this.Collection = Collection;
            this.Reverse = Reverse;

            if (Reverse)
            {
                this.Position = Collection.GetItems().Count;
            }
        }

        public override object Current()
        {
            return this.Collection.GetItems()[Position];
        }

        public override int Key()
        {
            return this.Position;
        }

        public override bool MoveNext()
        {
            int updatedPosition = this.Position + (this.Reverse ? -1 : 1);

            if (updatedPosition >= 0 && updatedPosition < this.Collection.GetItems().Count)
            {
                this.Position = updatedPosition;
                return true;
            }
            else
            {
                return false;
            }
        }

        public override void Reset()
        {
            this.Position = this.Reverse ? this.Collection.GetItems().Count - 1 : 0;
        }
    }
    #endregion
    #region Collection
    interface ICollection : IEnumerable
    {
        IEnumerator GetEnumerator();
    }

    class Collection : ICollection
    {
        private List<string> container = new List<string>();

        private bool direction = false;

        public void ReverseDirection()
        {
            direction = !direction;
        }

        public List<string> GetItems()
        {
            return container;
        }

        public void AddItem(string item)
        {
            container.Add(item);
        }

        public IEnumerator GetEnumerator()
        {
            return new Iterator(this, direction);
        }
    }
    #endregion

    class Program
    {
        static void Main(string[] args)
        {
            var collection = new Collection();
            collection.AddItem("First");
            collection.AddItem("Second");
            collection.AddItem("Third");
            Console.WriteLine("Straight traversal:");
            foreach (var element in collection)
            {
                Console.WriteLine(element);
            }
            Console.WriteLine("\nReverse traversal:");
            collection.ReverseDirection();
            foreach (var element in collection)
            {
                Console.WriteLine(element);
            }
        }
    }
}
