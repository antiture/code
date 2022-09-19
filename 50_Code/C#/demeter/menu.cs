using System;

//菜单
public class Menu
{
    public string Content { get; set; }

    public string Get()
    {
        return Content;
    }
}

public class Waiter
{
    //私有 不对外开放
    private Menu Menu = new Menu();

    public Menu GetMenu()
    {
        return Menu;
    }
}

//顾客
public class People
{
    public Waiter Waiter = new Waiter();

    public Waiter GetWaiter()
    {
        return Waiter;
    }
}

class Program
{
    static void Main(string[] args)
    {
        People people = new People();
        people.GetWaiter().GetMenu().Get();
    }
}
