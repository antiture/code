using System;

namespace RefactoringGuru.DesignPatterns.ChairFactory.Conceptual
{
    #region Furniture
    public interface IFurnitureFactory
    {
        IChair CreateChair();
        ITable CreateTable();
    }

    class ModernFactory : IFurnitureFactory
    {
        public IChair CreateChair()
        {
            return new ModernChair();
        }

        public ITable CreateTable()
        {
            return new ModernTable();
        }
    }

    class VictoriaFactory : IFurnitureFactory
    {
        public IChair CreateChair()
        {
            return new VictoriaChair();
        }

        public ITable CreateTable()
        {
            return new VictoriaTable();
        }
    }

    #endregion
    #region IChair
    public interface IChair
    {
        string SiteOn();
    }

    class ModernChair : IChair
    {
        public string SiteOn()
        {
            return "Site on modern chair";
        }
    }

    class VictoriaChair : IChair
    {
        public string SiteOn()
        {
            return "Site on victoria chair";
        }
    }
    #endregion
    #region ITable
    public interface ITable
    {
        string PutHandOn();
        string PutCupOn(IChair iChair);
    }

    class ModernTable : ITable
    {
        public string PutHandOn()
        {
            return "ModernTable put hand on";
        }

        public string PutCupOn(IChair iChair)
        {
            var result = iChair.SiteOn();
            return $"ModernTable put cup on  ({result})";
        }
    }

    class VictoriaTable : ITable
    {
        public string PutHandOn()
        {
            return "VictoriaTable put hand on ";
        }

        public string PutCupOn(IChair iChair)
        {
            var result = iChair.SiteOn();

            return $"VictoriaTable put cup on ({result})";
        }
    }
    #endregion
     

    // class Program
    // {
    //     static void Main(string[] args)
    //     {
    //         Console.WriteLine("Client: Testing client code with the first factory type...");
    //         ModernFactory modernFactory = new ModernFactory();

    //         Console.WriteLine(modernFactory.CreateChair().SiteOn());
    //         Console.WriteLine(modernFactory.CreateTable().PutHandOn());
    //         Console.WriteLine(modernFactory.CreateTable().PutCupOn(modernFactory.CreateChair())); 
    //     }
    // }
}
