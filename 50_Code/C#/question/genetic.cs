using System;
using System.Collections.Generic;

public abstract class Item
{
    public Guid Id { get; set; }
}

public class Clause : Item
{
    public String Text { get; set; }
}

public interface IItem<T> // <Type> type de signature non defini
{
    public void ItemAdd(T parameters);
}

public class ClauseModel : IItem<Clause>
{
    public Clause Clause { get; set; }

    public void ItemAdd(Clause clause)
    {
        throw new NotImplementedException();
    }
}

class Program
{
    static void Main()
    {
        var text = "1";
        ClauseModel clause = new ClauseModel() { Text = text };
        clause.ItemAdd(clause); ////????????????????????????????????????????????
    }
}
