// Factory Method Design Pattern
//
// Intent: Provides an interface for creating objects in a superclass, but
// allows subclasses to alter the type of objects that will be created.

using System;

namespace RefactoringGuru.DesignPatterns.PlanDeliver.Conceptual
{
    #region logistics
    abstract class Logistics
    { 
        public abstract ITransport PlanDeliver(); //FactoryMethod -- abstract
        public string CreateTransport()
        { 
            return "Create transport " + PlanDeliver().Deliver();//FactoryMethod.InterfaceMethod
        }
    }
    class RoadLogistics : Logistics
    { 
        public override ITransport PlanDeliver() // -- override
        {
            return new Truck();
        }
    }
    class SeaLogistics : Logistics
    {
        public override ITransport PlanDeliver()
        {
            return new Ship();
        }
    } 
    #endregion
    #region Transport 
    public interface ITransport
    { 
        string Deliver();
    }
    class Truck : ITransport
    {
        public string Deliver()
        {
            return "{In box}";
        }
    }
    class Ship : ITransport
    { 
        public string Deliver()
        {
            return "{In container}";
        }
    } 
    #endregion
    
    //class Program
    //{ 
    //    static void Main(string[] args)
    //    {
    //        RoadLogistics roadLogistics =  new RoadLogistics(); 
    //        Console.WriteLine(roadLogistics.CreateTransport() );  
    //    }
    //}
}
