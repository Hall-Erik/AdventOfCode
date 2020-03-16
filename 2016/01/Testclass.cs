using Xunit;

namespace _01
{
    public class Testclass
    {
        [Fact]
        public void PartOneTest()
        {
            Assert.Equal(5, Program.ReadDirections(new string[] {"R2", "L3"}));
            Assert.Equal(2, Program.ReadDirections(new string[] {"R2", "R2", "R2"}));
            Assert.Equal(12, Program.ReadDirections(new string[] {"R5", "L5", "R5", "R3"}));
            Assert.Equal(0, Program.ReadDirections(new string[] {"R5", "R5", "R5", "R5"}));
        }

        [Fact]
        public void CardinalTest()
        {
            Assert.Equal(3, Program.GetCardinal(0, 'L'));
            Assert.Equal(0, Program.GetCardinal(3, 'R'));
        }
    }
}