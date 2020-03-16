using System;

namespace _01
{
    class Program
    {
        public static int GetCardinal(int current, char turn)
        {
            if (turn == 'R')
            {
                return (current + 1) % 4;
            }
            else
            {//Turn left
                // C#'s modulo is really a remainder ¯\_(ツ)_/¯
                int shift = current - 1;
                return (shift >= 0) ? shift % 4 : shift + 4;
            }
        }

        public static int ReadDirections(string[] directions)
        {
            int cardinal = 0; // 0 = North, 1 = East, 2 = South, 3 = West
            int x = 0;
            int y = 0;
            foreach (string d in directions)
            {
                cardinal = GetCardinal(cardinal, d[0]);
                int mag = Int32.Parse(d.Substring(1));
                switch (cardinal)
                {
                    case 0:
                        y += mag;
                        break;
                    case 1:
                        x += mag;
                        break;
                    case 2:
                        y -= mag;
                        break;
                    case 3:
                        x -= mag;
                        break;
                }
            }
            return Math.Abs(x) + Math.Abs(y);
        }

        static void Main(string[] args)
        {
            string[] lines = System.IO.File.ReadAllLines("input.txt");
            string[] dirs = lines[0].Replace(",", string.Empty).Split(' ');
            Console.WriteLine(ReadDirections(dirs));
        }
    }
}
