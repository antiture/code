// Factory Method Design Pattern
//
// Intent: Provides an interface for creating objects in a superclass, but
// allows subclasses to alter the type of objects that will be created.

using System;

namespace RefactoringGuru.DesignPatterns.FactoryMethod.Conceptual
{
    abstract class Creator
    {
        //1 创建者 （Cre­ator） 类声明返回产品对象的工厂方法。 该方法的返回对象类型必须与产品接口相匹配。  
        // 注意， 尽管它的名字是创建者， 但它最主要的职责并不是创建产品。 一般来说， 创建者类包含一些与产品相关的核心业务逻辑。 工厂方法将这些逻辑处理从具体产品类中分离出来。 打个比方， 大型软件开发公司拥有程序员培训部门。 但是， 这些公司的主要工作还是编写代码， 而非生产程序员。
        public abstract IProduct FactoryMethod();
        // 你可以将工厂方法声明为抽象方法， 强制要求每个子类以不同方式实现该方法。 或者， 你也可以在基础工厂方法中返回默认产品类型。

        public string SomeOperation()
        {
            var product = FactoryMethod();
            var result =
                "Creator: The same creator's code has just worked with " + product.Operation();
            return result;
        }
    }

    class ConcreteCreator1 : Creator
    {
        //4 具体创建者 （Con­crete Cre­ators） 将会重写基础工厂方法， 使其返回不同类型的产品。
        //注意， 并不一定每次调用工厂方法都会创建新的实例。 工厂方法也可以返回缓存、 对象池或其他来源的已有对象。
        public override IProduct FactoryMethod()
        {
            return new ConcreteProduct1();
        }
    }

    class ConcreteCreator2 : Creator
    {
        public override IProduct FactoryMethod()
        {
            return new ConcreteProduct2();
        }
    }

    public interface IProduct
    {
        //1 产品 （Prod­uct） 将会对接口进行声明。 对于所有由创建者及其子类构建的对象， 这些接口都是通用的。
        string Operation();
    }

    class ConcreteProduct1 : IProduct
    {
        public string Operation()
        {
            return "{Result of ConcreteProduct1}";
        }
    }

    class ConcreteProduct2 : IProduct
    {
        //2 具体产品（Con­crete Prod­ucts） 是产品接口的不同实现。
        public string Operation()
        {
            return "{Result of ConcreteProduct2}";
        }
    }

    class Client
    {
        // public void Main()
        // {
        //     Console.WriteLine("App: Launched with the ConcreteCreator1.");
        //     ClientCode(new ConcreteCreator1());

        //     Console.WriteLine("");

        //     Console.WriteLine("App: Launched with the ConcreteCreator2.");
        //     ClientCode(new ConcreteCreator2());
        // }
        // public void ClientCode(Creator creator)
        // {
        //     Console.WriteLine(
        //         "Client: I'm not aware of the creator's class,"
        //             + "but it still works.\n"
        //             + creator.SomeOperation()
        //     );
        // }
    }

    // class Program
    // {
    //     static void Main(string[] args)
    //     {
    //         new Client().Main();
    //     }
    // }
}
