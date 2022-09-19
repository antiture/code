using System;

//菜单
public class Menu
{
    public string Content { get; set; }
}

public class Waiter
{
    public Menu menu = new Menu();
}

public class People
{
    public void GetMenu()
    {
        Waiter waiter = new Waiter();
        Menu menu = waiter.menu;
        Console.WriteLine(menu.Content);
    }
}

class Program
{
    static void Main(string[] args)
    {
        People people = new People();
        people.GetMenu();
    }
}
