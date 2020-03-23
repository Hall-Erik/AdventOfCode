using Xunit;
using System.Collections.Generic;

namespace _02
{
    public class Testclass
    {
        [Fact]
        public void PartOneTest() {
            string[] lines = new string[] {
                "ULL",
                "RRDDD",
                "LURDL",
                "UUUUD"
            };
            List<List<string>> keypad = Program.GetStandardKeypad();
            Assert.Equal("1985", Program.decodeLines(lines, keypad));
        }

        [Fact]
        public void PartTwoTest() {
            string[] lines = new string[] {
                "ULL",
                "RRDDD",
                "LURDL",
                "UUUUD"
            };
            List<List<string>> keypad = Program.GetDiamondKeypad();
            Assert.Equal("5DB3", Program.decodeLines(lines, keypad, 0, 2));
        }
    }
}