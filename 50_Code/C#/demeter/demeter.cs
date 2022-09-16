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
        decimal charge = 1m;
        foreach (Customer customer in Customers)
        {
            decimal payment = customer.MakePayment(charge);
            if (payment != 0m)
            {
                this.FundsCollected += payment;
            }
        }
    }
}

public class Customer
{
    public Customer() : this(null) { }

    public Customer(Wallet Wallet)
    {
        Wallet = Wallet;
    }

    public Wallet Wallet { get; set; }

    public decimal MakePayment(decimal amount)
    {
        if (Wallet.Money >= amount)
        {
            Wallet.Money -= amount;
            return amount;
        }

        return 0m;
    }
}

public class Wallet
{
    public Wallet(decimal Money)
    {
        Money = Money;
    }

    public decimal Money { get; set; }
}

class Program
{
    static void Main(string[] args) { }

     
}
