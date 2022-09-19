

using System;
using System.Collections.Generic;

namespace RefactoringGuru.DesignPatterns.ChainOfResponsibilityNotes.Conceptual
{
    public interface IHandler
    {
        IHandler SetNext(IHandler iHandler);
		
        object Handle(object request);
    }
    abstract class  BaseHandler : IHandler
    {
        private IHandler IHandler;

        public IHandler SetNext(IHandler iHandler)
        {
            this.IHandler = iHandler;
            return iHandler;
        }
		
        public virtual object Handle(object request)
        {
            if (this.IHandler != null)
            {
                return this.IHandler.Handle(request);
            }
            else
            {
                return null;
            }
        }
    }

    class HandlerA :  BaseHandler
    {
        public override object Handle(object request)
        {
            if ((request as string) == "requestA")
            {
                return $"HandlerA: I'll do the {request.ToString()}.\n";
            }
            else
            {
                return base.Handle(request);
            }
        }
    }

    class HandlerB :  BaseHandler
    {
        public override object Handle(object request)
        {
            if (request.ToString() == "requestB")
            {
                return $"HandlerB: I'll do the {request.ToString()}.\n";
            }
            else
            {
                return base.Handle(request);
            }
        }
    }

    class HandlerC :  BaseHandler
    {
        public override object Handle(object request)
        {
            if (request.ToString() == "requestC")
            {
                return $"HandlerC: I'll do the {request.ToString()}.\n";
            }
            else
            {
                return base.Handle(request);
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var handlerA = new HandlerA();
            var handlerB = new HandlerB();
            var handlerC = new HandlerC();
            handlerA.SetNext(handlerB).SetNext(handlerC); 

            List<string> requests =  new List<string> { "requestA", "requestB", "requestC" };
            Console.Write("handlerA.Handle(request) \n");
            foreach (var request in requests)
            { 
                Console.Write($"{handlerA.Handle(request)} \n");
            }
            Console.Write("handlerB.Handle(request) \n");
            foreach (var request in requests)
            { 
                Console.Write($"{handlerB.Handle(request)} \n");
            }
        } 
    }
}
