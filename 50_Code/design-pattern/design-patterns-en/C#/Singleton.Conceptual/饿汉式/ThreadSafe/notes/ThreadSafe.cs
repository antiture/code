 

using System;
using System.Threading;

namespace Singleton.One
{
     
    class Singleton
    {
        private Singleton() { } //1 私有化构造器 外部不能new
        private static Singleton _instance ; //2 本类内部创建实例对象
        private static readonly object _lock = new object(); //4 将类的实例放在静态代码块中 
        public static Singleton GetInstance(string value)  // 3 提供一个公有的静态方法，返回实例对象
        { 
            if (_instance == null)
            { 
                lock (_lock)
                { 
                    if (_instance == null)
                    {
                        _instance = new Singleton();
                        _instance.Value = value;
                    }
                }
            }
            return _instance;
        } 
        public string Value { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
 
            Console.WriteLine(
                "{0}\n{1}\n\n{2}\n",
                "If you see the same value, then singleton was reused (yay!)",
                "If you see different values, then 2 singletons were created (booo!!)",
                "RESULT:"
            );
            
            Thread process1 = new Thread(() =>
            {
                TestSingleton("FOO");
            });
            Thread process2 = new Thread(() =>
            {
                TestSingleton("BAR");
            });
            
            process1.Start();
            process2.Start();
            
            process1.Join();
            process2.Join();
        }
        
        public static void TestSingleton(string value)
        {
            Singleton singleton = Singleton.GetInstance(value);
            Console.WriteLine(singleton.Value);
        } 
    }
}
