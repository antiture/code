// this 关键字引用类的当前实例。

// 以下是 this 的常用用途：

// 限定被相似的名称隐藏的成员
// 将对象作为参数传递到其他方法
// 声明索引器
using System;
class Employee
{
    private string _name;
    private int _age;
    private string[] _arr = new string[5];

    public Employee(string name, int age)
    {
        // 使用this限定字段，name与age
        this._name = name;
        this._age = age;
    }

    public string Name
    {
        get { return this._name; }
    }

    public int Age
    {
        get { return this._age; }
    }

    // 打印雇员资料
    public void PrintEmployee()
    {
        // 将Employee对象作为参数传递到DoPrint方法
        Print.DoPrint(this);
    }

    // 声明索引器
    public string this[int param]
    {
        get { return _arr[param]; }
        set { _arr[param] = value; }
    }

}
class Print
{
    public static void DoPrint(Employee e)
    {
        Console.WriteLine("Name: {0}\nAge: {1}", e.Name, e.Age);
    }
}

class TestApp
{
    static void Main()
    {
        Employee E = new Employee("Hunts", 21);
        E[0] = "Scott";
        E[1] = "Leigh";
        E[4] = "Kiwis";
        E.PrintEmployee();

        for(int i=0; i<5; i++)
        {
            Console.WriteLine("Friends Name: {0}", E[i]);
        }

        Console.ReadLine();
    }
}

/*
控制台输出：
Name: Hunts
Age: 21
Friends Name: Scott
Friends Name: Leigh
Friends Name: 
Friends Name: 
Friends Name: Kiwis
*/
