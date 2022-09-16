using System;

namespace single2
{
    public class Name
    {
        public void Validate(string name)
        {
            if (String.IsNullOrWhiteSpace(name))
            {
                throw new Exception("The name is invalid!");
            }
        }
    }

    public class Email
    {
        public void Validate(string email)
        {
            if (!email.Contains("@") || !email.Contains("."))
            {
                throw new Exception("Email is not valid!!");
            }
        }
    }

    public class Invitation
    {
        Name Name;
        Email Email;

        public Invitation(Name Name, Email Email)
        {
            Name = Name;
            Email = Email;
        }

        public string SendInvite(string email, string firstName, string lastName)
        {
            Name.Validate(firstName, lastName);
            Email.Validate(email);
            return "Email sended ";
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Invitation invitation = new Invitation();
            invitation.SendInvite("a@a.a", "Xi Zijian");
        }
    }
}
