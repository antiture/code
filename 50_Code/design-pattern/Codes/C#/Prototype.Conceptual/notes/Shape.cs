using System;
using System.Collections.Generic;

namespace RefactoringGuru.DesignPatterns.Shape.Conceptual
{
    public abstract class Shape
    {
        public int X;
        public int Y;
        public string Color;

        public Shape(Shape shape)
        {
            this.X = shape.X;
            this.Y = shape.Y;
            this.Color = shape.Color;
        }

        public Shape() { }

        public abstract Shape Clone();
    }

    public class Rectangle : Shape
    {
        public int Width { get; set; }
        public int Height { get; set; }

        public Rectangle(Rectangle rectangle) : base(rectangle)
        {
            this.Width = rectangle.Width;
            this.Height = rectangle.Height;
        }

        public Rectangle() { }

        public override Shape Clone()
        {
            return new Rectangle(this);
        }
    }

    public class Circle : Shape
    {
        public int Radius;

        public Circle(Circle circle) : base(circle)
        {
            this.Radius = circle.Radius;
        }

        public Circle() { }

        public override Shape Clone()
        {
            return new Circle(this);
        }
    }

    public class Application
    {
        public List<Shape> Shapes { get; set; }

        public Application()
        {
            Shapes = new List<Shape>();
            Circle circle = new Circle();
            circle.X = 10;
            circle.Y = 10;
            circle.Radius = 20000000;
            Shapes.Add(circle);
            Shape anotherCircle = circle.Clone();
            circle.Radius = 1000000;
            Shapes.Add(anotherCircle);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            List<Shape> Shapes = new List<Shape>();
            Circle circle = new Circle();
            circle.X = 10;
            circle.Y = 10;
            circle.Radius = 20000000;
            Shapes.Add(circle);
            Shape anotherCircle = circle.Clone();
            circle.Radius = 1000000;
            Shapes.Add(anotherCircle);

            string circleResult = "Shapes:" + "\n";
            foreach (Circle circleInShapes in Shapes)
            {
                circleResult = circleResult + circleInShapes.Radius.ToString() + "\n";
            }
            Console.WriteLine(circleResult);
        }
    }
}
