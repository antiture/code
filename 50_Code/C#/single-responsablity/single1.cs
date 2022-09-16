using System;

namespace single
{
    public interface ILogger
    {
        void Info(string info);
        void Debug(string info);
    }

    public class Logger : ILogger
    {
        public Logger() { }

        public void Info(string info) { }

        public void Debug(string info) { }
    }

    public class MailSender
    {
        public string EMailBody { get; set; }

        public void SendEmail() { }
    }

    public class Invoice
    {
        public long InvAmount { get; set; }
        public DateTime InvDate { get; set; }
        private ILogger fileLogger;
        private MailSender emailSender;

        public Invoice()
        {
            fileLogger = new Logger();
            emailSender = new MailSender();
        }

        public void AddInvoice()
        {
            fileLogger.Info("Add method Start");
            emailSender.EMailBody = "A class should have only one reason to change";
            emailSender.SendEmail();
        }

        public void DeleteInvoice()
        {
            fileLogger.Info("Delete Invoice Start at @" + DateTime.Now);
        }
    }

    class Program
    {
        static void Main(string[] args) { }
    }
}
