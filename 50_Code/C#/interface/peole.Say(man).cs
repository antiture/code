//接口作为参数，实现对不同类的解耦，下面是常见的男女类

public interface ISay
{
    void Say();
}

public class Man : ISay
{
    public void Say()
    {
        Console.WriteLine("你好，我是男士！");
    }
}

public class Woman : ISay
{
    public void Say()
    {
        Console.WriteLine("你好，我是女士！");
    }
}

public class Peole
{
    public void Say(ISay iPeople)
    {
        iPeople.Say();
    }
}

class Program
{
    static void Main(string[] args)
    {
        Man man = new Man();
        Woman woman = new Woman();
        Peole peole = new Peole();
        peole.Say(man);
        peole.Say(woman);
        Console.ReadLine();
    }
}
