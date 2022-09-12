using System;
using System.Collections.Generic;

namespace RefactoringGuru.DesignPatterns.Vehicle.Conceptual
{
    public interface IBuilder
    {
        void BuildSeat();

        void BuildWheel();

        void BuildEngine();
    }

    public class CarBuilder : IBuilder
    {
        private Vehicle Vehicle = new Vehicle();

        public CarBuilder()
        {
            this.Reset();
        }

        public void Reset()
        {
            this.Vehicle = new Vehicle();
        }

        public void BuildSeat()
        {
            this.Vehicle.Add("CarSeat");
        }

        public void BuildWheel()
        {
            this.Vehicle.Add("CarWheel");
        }

        public void BuildEngine()
        {
            this.Vehicle.Add("CarEngine");
        }

        public Vehicle GetVehicle()
        {
            Vehicle result = this.Vehicle;

            this.Reset();

            return result;
        }
    }

    public class TruckBuilder : IBuilder
    {
        private Vehicle Vehicle = new Vehicle();

        public TruckBuilder()
        {
            this.Reset();
        }

        public void Reset()
        {
            this.Vehicle = new Vehicle();
        }

        public void BuildSeat()
        {
            this.Vehicle.Add("TruckSeat");
        }

        public void BuildWheel()
        {
            this.Vehicle.Add("TruckWheel");
        }

        public void BuildEngine()
        {
            this.Vehicle.Add("TruckEngine");
        }

        public Vehicle GetVehicle()
        {
            Vehicle result = this.Vehicle;

            this.Reset();

            return result;
        }
    }

    public class Vehicle
    {
        private List<object> Parts = new List<object>();

        public void Add(string part)
        {
            this.Parts.Add(part);
        }

        public string ListParts()
        {
            string str = string.Empty;

            for (int i = 0; i < this.Parts.Count; i++)
            {
                str += this.Parts[i] + ", ";
            }
            return "Vehicle parts: " + str + "\n";
        }
    }

    public class Director
    {
        private IBuilder IBuilder {get; set;}

        public void SetBuilder(IBuilder builder)
        {
            IBuilder = builder;
        }

        public void BuildVehicle(String type)
        {
            if (type == "simple")
            {
                this.IBuilder.BuildSeat();
            }
            else if (type == "complete")
            {
                this.IBuilder.BuildSeat();
                this.IBuilder.BuildWheel();
                this.IBuilder.BuildEngine();
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            //carBuilder  //使用director
            var carDirector = new Director();
            var carBuilder = new CarBuilder();
            carDirector.SetBuilder(carBuilder);

            carDirector.BuildVehicle("simple");
            Console.WriteLine(carBuilder.GetVehicle().ListParts());

            carDirector.BuildVehicle("complete");
            Console.WriteLine(carBuilder.GetVehicle().ListParts());
 
            //truckBuilder  //如果不使用director
            var truckBuilder = new TruckBuilder();  
            truckBuilder.BuildSeat();
            truckBuilder.BuildEngine();
            Console.Write(truckBuilder.GetVehicle().ListParts());
        }
    }
}
