 
using System;

namespace RefactoringGuru.DesignPatterns.Singleton.Conceptual.NonThreadSafe1
{ 
    public sealed class Singleton
    { 
        private Singleton() { } //1 私有化构造器 外部不能new
        private static Singleton _instance; //2 本类内部创建实例对象
        public static Singleton GetInstance() // 3 提供一个公有的静态方法，返回实例
        {
            if (_instance == null)
            {
                _instance = new Singleton();
            }
            return _instance;
        } 
        public void someBusinessLogic()
        {
            // ...
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // The client code.
            Singleton s1 = Singleton.GetInstance();
            Singleton s2 = Singleton.GetInstance();

            if (s1 == s2)
            {
                Console.WriteLine("Singleton works, both variables contain the same instance.");
            }
            else
            {
                Console.WriteLine("Singleton failed, variables contain different instances.");
            }
        }
    }
}
