using System.Text;

namespace Day11;

public class GalaxyPair(Galaxy a, Galaxy b)
{
    public readonly Galaxy a = a;
    public readonly Galaxy b = b;

    public long GetDist()
    {
        return Math.Abs(a.x - b.x) + Math.Abs(a.y - b.y);
    }
}

public class Galaxy(long x, long y)
{
    public long x = x;
    public long y = y;
}

public class Universe
{
    private readonly string[] uni;
    private readonly List<Galaxy> galaxies = [];
    private readonly List<GalaxyPair> galaxyPairs = [];

    private readonly long height;
    private readonly long width;

    private readonly Dictionary<string, Galaxy> galaxyDict = [];

    public Universe(string[] lines, long expansionFactor = 2)
    {
        uni = [..lines];
        long w = uni[0].Length;
        long h = uni.Length;

        // Find Galaxies
        for (int j = 0; j < uni.Length; j++) {
            for (int i = 0; i < uni[j].Length; i++) {
                if (uni[j][i] == '#') {
                    galaxies.Add(new Galaxy(i, j));
                }
            }
        }

        // Expand rows
        for (long j = h; j >= 1; j--) {
            if (!galaxies.Any(g => g.y == j - 1)) {
                foreach (Galaxy g in galaxies.Where(g => g.y >= j)) {
                    g.y = g.y + expansionFactor - 1;
                }
            }
        }

        // Expand columns
        for (long i = w; i >= 1; i--) {
            if (!galaxies.Any(g => g.x == i - 1)) {
                foreach (Galaxy g in galaxies.Where(g => g.x >= i)) {
                    g.x = g.x + expansionFactor - 1;
                }
            }
        }

        foreach (Galaxy g in galaxies) {
            galaxyDict[$"{g.x},{g.y}"] = g;
            if (g.x >= w) {
                w = g.x + 1;
            }
            if (g.y >= h) {
                h = g.y + 1;
            }
        }
        height = h;
        width = w;

        Console.WriteLine($"height: {height}");
        Console.WriteLine($"width: {width}");

        // Find pairs
        for (int i = 0; i < galaxies.Count - 1; i++) {
            for (int j = i + 1; j < galaxies.Count; j++) {
                galaxyPairs.Add(new GalaxyPair(galaxies[i], galaxies[j]));
            }
        }
    }

    public long TotalDist()
    {
        long sum = 0;
        foreach (GalaxyPair p in galaxyPairs)
        {
            sum += p.GetDist();
        }
        return sum;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        // foreach (string line in uni)
        // {
        //     sb.AppendLine(line);
        // }
        // sb.AppendLine();
        // for (long y = 0; y < height; y++) {
        //     for (long x = 0; x < width; x++) {
        //         if (galaxyDict.ContainsKey($"{x},{y}")) {
        //             sb.Append('#');
        //         } else {
        //             sb.Append('.');
        //         }
        //     }
        //     sb.AppendLine();
        // }
        // sb.AppendLine();
        sb.AppendLine("Galaxies: " + galaxies.Count);
        sb.AppendLine("Pairs: " + galaxyPairs.Count);
        sb.AppendLine("Total dist: " + TotalDist());
        return sb.ToString();
    }
}

public class Program
{
    public static readonly string[] testLines = [
        "...#......",
        ".......#..",
        "#.........",
        "..........",
        "......#...",
        ".#........",
        ".........#",
        "..........",
        ".......#..",
        "#...#.....",
    ];

    public static void Main(string[] args)
    {
        Universe testU = new(testLines);
        Console.WriteLine(testU);

        string[] lines = File.ReadAllLines("input.txt");

        Universe universe = new(lines);
        Console.WriteLine(universe);

        // // Part 2
        testU = new(testLines, 10);
        Console.WriteLine(testU);

        testU = new(testLines, 100);
        Console.WriteLine(testU);

        universe = new(lines, 1000000);
        Console.WriteLine(universe); // 123975390 too low
    }
}
