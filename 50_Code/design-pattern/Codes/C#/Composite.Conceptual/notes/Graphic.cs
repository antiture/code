
using System;
using System.Collections.Generic;

namespace RefactoringGuru.DesignPatterns.Grapic.Conceptual
{
    abstract class Component
    {
        public Component() { }
        public abstract string Operation();
        public virtual void Add(Component component)
        {
            throw new NotImplementedException();
        } 
        public virtual bool IsComposite()
        {
            return true;
        }
    }
    class Leaf : Component
    {
        public override string Operation()
        {
            return "Leaf";
        }
        public override bool IsComposite()
        {
            return false;
        }
    }
    class Composite : Component
    {
        protected List<Component> Components = new List<Component>();
        
        public override void Add(Component component)
        {
            this.Components.Add(component);
        } 
        public override string Operation()
        {
            int i = 0;
            string result = "{";
            foreach (Component component in this.Components)
            {
                result += component.Operation(); 
                i++;
            }
            return result + "}";
        }
    }

    
    class Program
    {
        static void Main(string[] args)
        {

            Leaf leaf = new Leaf();  
            Console.WriteLine($"{leaf.Operation()}\n");
            
            Composite compositeA = new Composite();
            Composite compositeB1 = new Composite();
            compositeB1.Add(new Leaf());
            compositeB1.Add(new Leaf());
            Composite compositeB2 = new Composite();
            compositeB2.Add(new Leaf());
            compositeA.Add(compositeB1);
            compositeA.Add(compositeB2);
            Console.WriteLine($"{compositeA.Operation()}\n"); 

            if (compositeA.IsComposite())
            {
                compositeA.Add(leaf);
            }
            Console.WriteLine($"{compositeA.Operation()}"); 
        }
    }
}
