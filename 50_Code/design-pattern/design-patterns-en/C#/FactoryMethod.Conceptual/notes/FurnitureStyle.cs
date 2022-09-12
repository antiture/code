// Factory Method Design Pattern
//
// Intent: Provides an interface for creating objects in a superclass, but
// allows subclasses to alter the type of objects that will be created.

using System;

namespace RefactoringGuru.DesignPatterns.ChairStyle.Conceptual
{
    #region Style
    interface IStyle
    {  
         IChair CreateChair(); 
    }
    class Victoria : IStyle
    { 
        public IChair CreateChair()  
        {
            return new VictoriaChair();
        }
    }
    class Modern : IStyle
    {
        public IChair CreateChair()
        {
            return new ModernChair();
        }
    } 
    #endregion
    #region Chair 
    public interface IChair
    { 
        string Create();
    }
    class VictoriaChair : IChair
    {
        public string Create()
        {
            return "{VictoriaChair}";
        }
    }
    class ModernChair : IChair
    { 
        public string Create()
        {
            return "{MordenChair}";
        }
    }
    #endregion

    class Program
    {
        static void Main(string[] args)
        {
            Victoria victoria = new Victoria();
            Console.WriteLine(victoria.CreateChair().Create());
        }
    }
}
