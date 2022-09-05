//假设我们公司有两种程序员：VB程序员，指的是用VB写程序的程序员，用clsVBProgramer这个类表示；Delphi程序员指的是用Delphi写程序的程序员，用clsDelphiProgramer这个类来表示。 每个类都有一个WriteCode()方法

interface IProgramer
{
    WriteCode();
}

//然后声明两个类，并实现IProgramer接口：
class clsVBProgramer : IProgramer
{
    WriteCode()
    {
        //用VB语言写代码；
    }
}

class clsDelphiProgramer : IProgramer
{
    WriteCode()
    {
        //用Delphi语言写代码；
    }
}

// 对clsProject这个类进行一下修改：
class clsProject
{
    WritePrograme(IProgramer programer)
    {
        programer.WriteCode(); //写代码
    }
}

class Program
{
    static void Main(string[] args)
    {
        clsProject proj = new clsProject();
        IProgramer programer;
        //如果需要用VB写代码
        programer = new clsVBProgramer();
        proj.WritePrograme(programer);
        //如果需要用Delphi写代码
        // programer = new clsDelphiProgramer();
        // proj.WritePrograme(programer);
    }
}


// exemple //////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface ICcagItem
{
    voide CcagItemAdd();
}

// 然后声明两个类，并实现IProgramer接口：
class CcagClause : ICcagItem
{
    voide CcagItemAdd(CcagClause ccagClause)
    {
        //_documentServie.>
    }
}

class CcagSubClause : ICcagItem
{
    voide CcagItemAdd(CcagSubClause ccagSubClause)
    {
        //_documentServie.>
    }
}

class CcagDocument
{
    CcagItemAdd(ICcagItem ccagItem)
    {
        ccagItem.CcagItemAdd(); //写代码
    }
}

class Program
{
    static void Main(string[] args)
    {
        CcagDocument ccagDocument = new CcagDocument();

        ICcagItem iCcagItem; 
        iCcagItem = new CcagClause(){
            Id = id
        };
        ccagDocument.CcagItemAdd(iCcagItem);
    }
}
