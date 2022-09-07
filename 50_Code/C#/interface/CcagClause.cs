//space SL.Model

public abstract class CcagItem
{ 
    public Guid Id { get; set; }
    public int Version { get; set; }
    public String Item { get; set; }
    public int Num { get; set; }
}
public class CcagClause : CcagItem
{   
    public int OrderNum { get; set; }
    public int ChapterNum { get; set; }
    public int ArticleNum { get; set; }
    public int ParagraphNum { get; set; } 
    public String Text { get; set; } 
}

//space SL.WebSite
public interface ICcagItem<T>        // <Type> type de signature non defini
{
    public void ItemAdd(T parameters);
}

public class CcagClauseModel: ICcagItem<CcagClause>
{
    public CcagClause CcagClause { get; set; }
    public void ItemAdd(CcagClause ccagClause)
    {
        throw new NotImplementedException();
    }
}

class Program
{
    static void Main()
    {
        var orderNum = 1;

        CcagClauseModel ccagClause = new CcagClauseModel(){
            OrderNum = orderNum /// attribue 赋值
        };
        ccagClause.ItemAdd(ccagClause);
    }
}
