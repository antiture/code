// exemple //////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//接口//////////////////////////////////////////////////////////////////////
interface IItem
{
    void ItemAdd();
}
//宾语类，并实现IProgramer接口：///////////////////////////////////////////////
class Clause : IItem
{
    public int ClauseNum { get; set; }

}
class SubClause : IItem
{
    public int SubClauseNum { get; set; }
    void ItemAdd(SubClause subClause)
    {
        //_documentServie.>
    }
}
//主语类//////////////////////////////////////////////////////////////////////
class Document
{
    List<IItem> items = new List<IItem>();
    Add(IItem iItem)
    {
       items.Add(iItem);
       if(items is Clause){
        //to do
        var cls = iItem as Clause;
        cls.ClauseNum ;
       }
    }
}
////////////////////////////////////////////////////////////////////////
class Program
{
    static void Main()
    {
        Document document = new Document();

        IItem iItem; 
        iItem = new Clause(){
            ClauseNum = clauseNum /// attribue 赋值
        };
        document.ItemAdd(iItem);
    }
}