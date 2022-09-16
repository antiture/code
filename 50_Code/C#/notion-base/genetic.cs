//space SL.Model

public abstract class Item
{ 
    public Guid Id { get; set; }
    public int Version { get; set; }
    public String Item { get; set; }
    public int Num { get; set; }
}
public class Clause : Item
{   
    public int OrderNum { get; set; }
    public int ChapterNum { get; set; }
    public int ArticleNum { get; set; }
    public int ParagraphNum { get; set; } 
    public String Text { get; set; } 
}

//space SL.WebSite
public interface IItem<T>        // <Type> type de signature non defini
{
    public void ItemAdd(T parameters);
}

public class ClauseModel: IItem<Clause>
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
        var orderNum = 1;

        ClauseModel clause = new ClauseModel(){
            OrderNum = orderNum /// attribue 赋值
        };
        clause.ItemAdd(clause);
    }
}
