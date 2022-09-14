// base用来继承父类构造器
using System;
public class BaseClass
{
    int num;

    public BaseClass()
    {
        Console.WriteLine("in BaseClass()");
    }

    public BaseClass(int i)
    {
        num = i;
        Console.WriteLine("in BaseClass(int {0})", num);
    }
}

public class DerivedClass : BaseClass
{
    // 该构造器调用 BaseClass.BaseClass() 
    // 继承父类构造器
    public DerivedClass() : base()
    {
    }

    // 该构造器调用 BaseClass.BaseClass(int i)
    public DerivedClass(int i) : base(i)
    {
    }

    static void Main()
    {
        DerivedClass dc = new DerivedClass();
        DerivedClass dc1 = new DerivedClass(1);
    }
}

/*
控制台输出:
in BaseClass()
in BaseClass(1)
*/