using System.Text.RegularExpressions;

namespace Day3;

public class Num
{
    readonly int x0;
    readonly int x1;
    readonly int y;
    public readonly int val;
    readonly string n;

    public readonly bool IsPart;
    public readonly bool IsGear;

    public readonly string partPos;

    private readonly Dictionary<string, string> parts;

    public Num(string n, int x, int y, Dictionary<string, string> parts)
    {
        x0 = x;
        x1 = x + n.Length - 1;
        this.y = y;
        val = int.Parse(n);
        this.n = n;
        this.parts = parts;

        bool IsPart = false;
        string partPos = "";
        foreach (string neighbor in FindNeighbors())
        {
            if (parts.TryGetValue(neighbor, out string? value))
            {
                IsPart = true;
                partPos = neighbor;
                IsGear = value == "*";
            }
        }
        this.partPos = partPos;
        this.IsPart = IsPart;
    }

    private List<string> FindNeighbors()
    {
        List<string> neighbors = [];
        for (int x = x0; x <= x1; x++ )
        {
            neighbors.Add($"{x-1},{y-1}");
            neighbors.Add($"{x},{y-1}");
            neighbors.Add($"{x+1},{y-1}");
            neighbors.Add($"{x-1},{y}");
            neighbors.Add($"{x+1},{y}");
            neighbors.Add($"{x-1},{y+1}");
            neighbors.Add($"{x},{y+1}");
            neighbors.Add($"{x+1},{y+1}");
        }
        return neighbors;
    }

    public override string ToString()
    {
        return n + ": at x=" + x0 + "-" + x1 + ", y=" + y + " len=" + n.Length + " " + IsPart;
    }
}

public class Program
{
    public static List<Num> FindNums(string[] lines, Dictionary<string, string> parts)
    {
        string pattern = @"\d+";
        Regex regex = new(pattern);
        List<Num> nums = [];
        for (int i = 0; i < lines.Length; i++)
        {
            string line = lines[i];
            MatchCollection matches = regex.Matches(line);
            foreach (Match match in matches.Cast<Match>())
            {
                Num num = new(match.Value, match.Index, i, parts);
                nums.Add(num);
            }
        }
        return nums;
    }

    public static Dictionary<string, string> FindSyms(string[] lines)
    {
        string pattern = @"[^\d.]";
        Regex regex = new(pattern);
        Dictionary<string, string> parts = [];
        for (int i = 0; i < lines.Length; i++)
        {
            string line = lines[i];
            MatchCollection matches = regex.Matches(line);
            foreach (Match match in matches.Cast<Match>())
            {
                parts[match.Index + "," + i] = match.Value;
            }
        }
        return parts;
    }

    public static int Part1(string[] lines)
    {
        Dictionary<string, string> parts = FindSyms(lines);
        List<Num> nums = FindNums(lines, parts);
        int sum = 0;
        foreach (var num in nums)
        {
            if (num.IsPart)
            {
                sum += num.val;
            }
        }
        return sum;
    }

    public static int Part2(string[] lines)
    {
        Dictionary<string, string> parts = FindSyms(lines);
        List<Num> nums = FindNums(lines, parts);
        Dictionary<string, int> gearNumCount = [];
        Dictionary<string, int> gearRatios = [];
        int sum = 0;
        foreach (Num num in nums)
        {
            if (num.IsGear)
            {
                int curr = gearNumCount.GetValueOrDefault(num.partPos, 0);
                gearNumCount[num.partPos] = curr + 1;
            }
        }
        foreach (var pair in gearNumCount)
        {
            if (pair.Value == 2)
            {
                int curr = 1;
                foreach (Num num in nums)
                {
                    if (num.partPos == pair.Key)
                    {
                        curr *= num.val;
                    }
                }
                sum += curr;
            }
        }
        return sum;
    }

    public static void Main(string[] args)
    {
        string[] testLines = [
            "467..114..",
            "...*......",
            "..35..633.",
            "......#...",
            "617*......",
            ".....+.58.",
            "..592.....",
            "......755.",
            "...$.*....",
            ".664.598..",
        ];
        int sum = Part1(testLines);
        Console.WriteLine("Part 1 Test: " + sum);
        string[] lines = GetLinesFromFile("input.txt");
        sum = Part1(lines);
        Console.WriteLine("Part 1: " + sum); // 498559
        sum = Part2(testLines);
        Console.WriteLine("Part 2 Test: " + sum);
        sum = Part2(lines);
        Console.WriteLine("Part 2: " + sum);
    }

    static string[] GetLinesFromFile(string path)
    {
        return File.ReadAllLines(path);
    }
}
