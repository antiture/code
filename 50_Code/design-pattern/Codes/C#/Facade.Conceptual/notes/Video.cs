using System;

namespace RefactoringGuru.DesignPatterns.Video.Conceptual
{
    public class Facade
    {
        protected Sub1 Sub1;

        protected Sub2 Sub2;

        public Facade(Sub1 Sub1, Sub2 Sub2)
        {
            this.Sub1 = Sub1;
            this.Sub2 = Sub2;
        }

        public string Operation()
        {
            string result = "Facade initializes Subs:\n";
            result += this.Sub1.operation1();
            result += this.Sub2.operation1();
            result += "Facade orders Subs to perform the action:\n";
            result += this.Sub1.operationN();
            result += this.Sub2.operationZ();
            return result;
        }
    }

    public class Sub1
    {
        public string operation1()
        {
            return "Sub1: Ready!\n";
        }

        public string operationN()
        {
            return "Sub1: Go!\n";
        }
    }

    public class Sub2
    {
        public string operation1()
        {
            return "Sub2: Get ready!\n";
        }

        public string operationZ()
        {
            return "Sub2: Fire!\n";
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Sub1 sub1 = new Sub1();
            Sub2 sub2 = new Sub2();
            Facade facade = new Facade(sub1, sub2);
            Console.Write(facade.Operation());
        }
    }
}
