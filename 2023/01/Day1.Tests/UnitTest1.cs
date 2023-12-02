namespace Day1.Tests;

public class UnitTest1
{
    [Fact]
    public void TestGetNum()
    {
        Assert.Equal(1, Program.GetNum("1"));
        Assert.Equal(2, Program.GetNum("two"));
        Assert.Equal(4, Program.GetNum("four"));
        Assert.Equal(6, Program.GetNum("6"));
        Assert.Equal(7, Program.GetNum("seven"));
        Assert.Equal(9, Program.GetNum("nine"));
    }

    [Fact]
    public void TestFindFirst()
    {
        string[] lines = {
            "1abc2",
            "pqr3stu8vwx",
            "a1b2c3d4e5f",
            "treb7uchet",
        };
        Assert.Equal(1, Program.FindFirst(lines[0], false));
        Assert.Equal(3, Program.FindFirst(lines[1], false));
        Assert.Equal(1, Program.FindFirst(lines[2], false));
        Assert.Equal(7, Program.FindFirst(lines[3], false));
    }

    [Fact]
    public void TestFindLast()
    {
        string[] lines = {
            "1abc2",
            "pqr3stu8vwx",
            "a1b2c3d4e5f",
            "treb7uchet",
        };
        Assert.Equal(2, Program.FindLast(lines[0], false));
        Assert.Equal(8, Program.FindLast(lines[1], false));
        Assert.Equal(5, Program.FindLast(lines[2], false));
        Assert.Equal(7, Program.FindLast(lines[3], false));
    }

    [Fact]
    public void TestGetSum()
    {
        string[] lines = {
            "1abc2",
            "pqr3stu8vwx",
            "a1b2c3d4e5f",
            "treb7uchet",
        };
        Assert.Equal(142, Program.GetSum(lines));
    }

    [Fact]
    public void TestFindFirstPt2()
    {
        string[] lines = {
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen",
        };
        Assert.Equal(2, Program.FindFirst(lines[0], true));
        Assert.Equal(8, Program.FindFirst(lines[1], true));
        Assert.Equal(1, Program.FindFirst(lines[2], true));
        Assert.Equal(2, Program.FindFirst(lines[3], true));
        Assert.Equal(4, Program.FindFirst(lines[4], true));
        Assert.Equal(1, Program.FindFirst(lines[5], true));
        Assert.Equal(7, Program.FindFirst(lines[6], true));
    }

    [Fact]
    public void TestFindLastPt2()
    {
        string[] lines = {
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen",
        };
        Assert.Equal(9, Program.FindLast(lines[0], true));
        Assert.Equal(3, Program.FindLast(lines[1], true));
        Assert.Equal(3, Program.FindLast(lines[2], true));
        Assert.Equal(4, Program.FindLast(lines[3], true));
        Assert.Equal(2, Program.FindLast(lines[4], true));
        Assert.Equal(4, Program.FindLast(lines[5], true));
        Assert.Equal(6, Program.FindLast(lines[6], true));
    }

    [Fact]
    public void TestGetSumPt2()
    {
        string[] lines = {
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen",
        };
        Assert.Equal(281, Program.GetSum(lines, true));
    }
}
