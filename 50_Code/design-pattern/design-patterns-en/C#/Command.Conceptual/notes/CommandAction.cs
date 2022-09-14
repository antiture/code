using System;

namespace RefactoringGuru.DesignPatterns.CommandAction.Conceptual
{
    public interface ICommand
    {
        void Execute();
    }

    class CommandA : ICommand
    {
        private string Param = string.Empty;

        public CommandA(string Param)
        {
            this.Param = Param;
        }

        public void Execute()
        {
            Console.WriteLine($"CommandA: ({this.Param})");
        }
    }

    class CommandB : ICommand
    {
        private Receiver Receiver;
        private string Param1;
        private string Param2;

        public CommandB(Receiver Receiver, string Param1, string Param2)
        {
            this.Receiver = Receiver;
            this.Param1 = Param1;
            this.Param2 = Param2;
        }

        public void Execute()
        {
            Console.WriteLine("CommandB: ");
            this.Receiver.OperationA(this.Param1);
            this.Receiver.OperationB(this.Param2);
        } 
    }

    class Receiver
    {
        public void OperationA(string param1)
        {
            Console.WriteLine($"Receiver: ({param1})");
        }

        public void OperationB(string param2)
        {
            Console.WriteLine($"Receiver: ({param2})");
        }
    }

    class Invoker
    {
        private ICommand ICommandA;
        private ICommand ICommandB;

        public void SetCommandA(ICommand iCommand)
        {
            Console.WriteLine("Invoker: SetCommandA");
            this.ICommandA = iCommand;
        }

        public void SetCommandB(ICommand iCommand)
        {
            this.ICommandB = iCommand;
            Console.WriteLine("Invoker: SetCommandB");
        }
         
        public void ExecuteCommand()
        {
            Console.WriteLine("Invoker: ExecuteCommand");
            if (this.ICommandA is ICommand)
            {
                this.ICommandA.Execute();
            }  
            if (this.ICommandB is ICommand)
            {
                this.ICommandB.Execute();
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Invoker invoker = new Invoker();
            Receiver receiver = new Receiver();
            invoker.SetCommandA(new CommandA("Hi")); 
            invoker.SetCommandB(new CommandB(receiver, "Send email", "Save report"));
            invoker.ExecuteCommand();
        }
    }
}
