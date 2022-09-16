using System;

public class Paperboy
{
    decimal FundsCollected;

    public Paperboy()
    {
        Customers = new List();
    }

    public List Customers { get; set; }

    public void CollectPayments()
    {
        decimal payment = 1m;
        foreach (Customer customer in Customers)
        {
            if (customer.Wallet.Money >= payment)
            {
                customer.Wallet.Money -= payment;
                FundsCollected += payment;
            }
        }
    }
}

public class Customer
{
    public Customer() : this(null) { }

    public Customer(Wallet wallet)
    {
        Wallet = wallet;
    }

    public Wallet Wallet { get; set; }
}

public class Wallet
{
    public Wallet(decimal money)
    {
        Money = money;
    }

    public decimal Money { get; set; }
}

class Program
{
    static void Main(string[] args)
    {
        Paperboy paperboy = new Paperboy();
        Console.WriteLine(paperboy.CollectPayments());
    }
}
