// exemple //////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//接口//////////////////////////////////////////////////////////////////////
interface IItem
{
    void ItemAdd(IItem iItem);
}
//宾语类，并实现IProgramer接口：///////////////////////////////////////////////
class Clause : IItem
{
    public int ClauseNum { get; set; }
    public void ItemAdd(IItem clause)
    {
        //_documentServie.>
    }
}
class SubClause : IItem
{
    public int SubClauseNum { get; set; }
    public void ItemAdd(IItem subClause)
    {
        //_documentServie.>
    }
}
//主语类//////////////////////////////////////////////////////////////////////
class Document
{
    void ItemAdd(IItem iItem)
    {
        iItem.ItemAdd(); 
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