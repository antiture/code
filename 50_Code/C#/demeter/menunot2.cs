using System;

//菜单
public class Menu
{
    public string Content { get; set; }
    public String Get()
    {
        return Content;
    }
}

public class Waiter
{
    public Menu Menu = new Menu();
    public Menu GetMenu()
    {
        return menu;
    }
}

public class People
{
    public Menu Menu = new Menu();
    public Waiter Waiter = new Waiter();
    public Waiter GetWaiter()
    {
        
        return Waiter;
    }
    public Menu GetMenu()
    {
        return Menu;
    }
}

class Program
{
    static void Main(string[] args)
    {
        People people = new People();
        people.Menu.Get();
    }
}
