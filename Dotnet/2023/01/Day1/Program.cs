namespace Day1;

using System.Text.RegularExpressions;

public partial class Program
{
    public const string patternPt1 = @"\d";
    public const string pattern = @"\d|one|two|three|four|five|six|seven|eight|nine";

    public static int GetNum(string s)
    {
        return s switch
        {
            "one" => 1,
            "two" => 2,
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9,
            _ => int.Parse(s),
        };
    }

    public static int FindFirst(string s, bool part2)
    {
        Match match = part2 ? MyRegex().Match(s) : MyRegex2().Match(s);
        string m = match.ToString();
        return GetNum(m);
    }

    public static int FindLast(string s, bool part2)
    {
        Match match = part2 ? MyRegex1().Match(s) : MyRegex3().Match(s);
        string m = match.ToString();
        return GetNum(m);
    }

    public static int GetSum(string[] lines, bool part2 = false)
    {
        int sum = 0;
        foreach (string s in lines)
        {
            sum += 10 * FindFirst(s, part2) + FindLast(s, part2);
        }
        return sum;
    }

    static void Main(string[] args)
    {
        string path = "input.txt";
        string[] lines = GetLinesFromFile(path);
        // // Part 1
        int sum = GetSum(lines);
        Console.WriteLine(sum);
        // // Part 2
        int sum2 = GetSum(lines, true);
        Console.WriteLine(sum2);
    }

    static string[] GetLinesFromFile(string path)
    {
        return File.ReadAllLines(path);
    }

    [GeneratedRegex(pattern)]
    private static partial Regex MyRegex();
    [GeneratedRegex(pattern, RegexOptions.RightToLeft)]
    private static partial Regex MyRegex1();
    [GeneratedRegex(patternPt1)]
    private static partial Regex MyRegex2();
    [GeneratedRegex(patternPt1, RegexOptions.RightToLeft)]
    private static partial Regex MyRegex3();
}
