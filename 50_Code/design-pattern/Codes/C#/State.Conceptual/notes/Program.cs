using System;

namespace RefactoringGuru.DesignPatterns.StateNotes.Conceptual
{
    class Context
    {
        private AState AState = null;

        public Context(AState aState)
        {
            this.ChangeState(aState);
        }

        public void ChangeState(AState aState)
        {
            Console.WriteLine($"Context: Transition to {aState.GetType().Name}.");
            this.AState = aState;
            this.AState.SetContext(this);
        }

        public void Request1()
        {
            this.AState.Handle1();
        }

        public void Request2()
        {
            this.AState.Handle2();
        }
    }

    abstract class AState
    {
        protected Context _context;

        public void SetContext(Context context)
        {
            this._context = context;
        }

        public abstract void Handle1();

        public abstract void Handle2();
    }

    class StateA : AState
    {
        public override void Handle1()
        {
            Console.WriteLine("StateA handles request1.");
            Console.WriteLine("StateA wants to change the state of the context.");
            this._context.ChangeState(new StateB());
        }

        public override void Handle2()
        {
            Console.WriteLine("StateA handles request2.");
        }
    }

    class StateB : AState
    {
        public override void Handle1()
        {
            Console.Write("StateB handles request1.");
        }

        public override void Handle2()
        {
            Console.WriteLine("StateB handles request2.");
            Console.WriteLine("StateB wants to change the state of the context.");
            this._context.ChangeState(new StateA());
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var context = new Context(new StateA());
            context.Request1();
            context.Request2();
        }
    }
}
