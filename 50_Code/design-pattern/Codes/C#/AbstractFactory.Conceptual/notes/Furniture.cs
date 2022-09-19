using System;

namespace RefactoringGuru.DesignPatterns.Furniture.Conceptual
{
    #region Style
    public interface IStyle
    {
        IChair CreateChair();
        ITable CreateTable();
    }

    class Modern : IStyle
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

    class Victoria : IStyle
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
        string Create();
    }

    class ModernChair : IChair
    {
        public string Create()
        {
            return "modern chair";
        }
    }

    class VictoriaChair : IChair
    {
        public string Create()
        {
            return "victoria chair";
        }
    }
    #endregion
    #region ITable
    public interface ITable
    {
        string Create();
        string CoupleWith(IChair iChair);
    }

    class ModernTable : ITable
    {
        public string Create()
        {
            return "ModernTable ";
        }

        public string CoupleWith(IChair iChair)
        {
            var result = iChair.Create();
            return $"ModernTable couple with  ({result})";
        }
    }

    class VictoriaTable : ITable
    {
        public string Create()
        {
            return "VictoriaTable";
        }

        public string CoupleWith(IChair iChair)
        {
            var chair = iChair.Create();

            return $"VictoriaTable couple with ({chair})";
        }
    }
    #endregion
    class Program
    {
        static void Main(string[] args)
        { 
            Modern modern = new Modern(); 
            Console.WriteLine(modern.CreateChair().Create()); 
            Console.WriteLine(modern.CreateTable().CoupleWith(modern.CreateChair())); 
        }
    }
}
