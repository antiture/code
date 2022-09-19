// Factory Method Design Pattern
//
// Intent: Provides an interface for creating objects in a superclass, but
// allows subclasses to alter the type of objects that will be created.

using System;

namespace RefactoringGuru.DesignPatterns.Furniture.Conceptual
{
    #region logistics
    abstract class Format
    { 
        public abstract IFurniture PlanCreate(); //FactoryMethod -- abstract
        public string CreateFurniture()
        { 
            return "Put on" + PlanCreate().Create();//FactoryMethod.InterfaceMethod
        }
    }
    class ChairFormat : Format
    { 
        public override IFurniture PlanCreate() // -- override
        {
            return new Chair();
        }
    }
    class TableFormat : Format
    {
        public override IFurniture PlanCreate()
        {
            return new Table();
        }
    } 
    #endregion
    #region Furniture 
    public interface IFurniture
    { 
        string Create();
    }
    class Chair : IFurniture
    {
        public string Create()
        {
            return "{Chair}";
        }
    }
    class Table : IFurniture
    { 
        public string Create()
        {
            return "{Table}";
        }
    }
    #endregion

    // class Program
    // {
    //     static void Main(string[] args)
    //     {
    //         ChairFormat chairFormat = new ChairFormat();
    //         Console.WriteLine(chairFormat.CreateFurniture());
    //     }
    // }
}
