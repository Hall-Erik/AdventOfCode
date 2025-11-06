using System;
using System.Text;
using System.Collections.Generic;

namespace _02
{
    class Program
    {
        public static List<List<string>> GetStandardKeypad()
        {
            List<List<string>> keypad = new List<List<string>>();
            keypad.Add(new List<string> {"1", "2", "3"});
            keypad.Add(new List<string> {"4", "5", "6"});
            keypad.Add(new List<string> {"7", "8", "9"});
            return keypad;
        }

        public static List<List<string>> GetDiamondKeypad()
        {
            List<List<string>> keypad = new List<List<string>>();
            keypad.Add(new List<string> {"", "", "1", "", ""});
            keypad.Add(new List<string> {"", "2", "3", "4", "" });
            keypad.Add(new List<string> {"5", "6", "7", "8", "9"});
            keypad.Add(new List<string> {"", "A", "B", "C", ""});
            keypad.Add(new List<string> {"", "", "D", "", ""});
            return keypad;
        }

        public static string decodeLines(
            string[] lines, List<List<string>> keypad,
            int x = 1, int y = 1
            )
        {
            StringBuilder code = new StringBuilder();
            foreach (string line in lines)
            {
                char[] charArr = line.ToCharArray();
                foreach(char c in charArr)
                {
                    switch (c)
                    {
                        case 'U':
                            if (y > 0 && keypad[y-1][x] != "")
                                y--;
                            break;
                        case 'D':
                            if (y < keypad.Count - 1 && keypad[y+1][x] != "")
                                y++;
                            break;
                        case 'L':
                            if (x > 0 && keypad[y][x-1] != "")
                                x--;
                            break;
                        case 'R':
                            if (x < keypad[y].Count -1 && keypad[y][x+1] != "")
                                x++;
                            break;
                    }
                }
                code.Append(keypad[y][x]);
            }
            return code.ToString();
        }

        static void Main(string[] args)
        {
            string[] lines = System.IO.File.ReadAllLines("input.txt");
            Console.WriteLine("Part 1:");
            List<List<string>> keypad = GetStandardKeypad();
            Console.WriteLine(decodeLines(lines, keypad, 0, 2));
            
            Console.WriteLine("Part 2:");
            keypad = GetDiamondKeypad();
            Console.WriteLine(decodeLines(lines, keypad, 0, 2));
        }
    }
}
