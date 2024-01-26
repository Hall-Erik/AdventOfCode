using System.Text;

namespace Day13;

public class Pattern
{
    readonly string[] lines;
    readonly int width;
    readonly int height;
    public Pattern(string[] lines)
    {
        this.lines = lines;
        height = lines.Length;
        width = lines[0].Length;
    }

    public bool TryHorizontal(out int columns)
    {
        bool res = false;
        columns = 1;
        while( columns < width) {
            int i = columns - 1;
            int j = columns;
            res = true;
            while(i >= 0 && j < width) {
                for (int n = 0; n < height; n++) {
                    if (lines[n][i] != lines[n][j]) {
                        res = false;
                        break;
                    }
                }
                if (res == false) break;
                i--;
                j++;
            }
            if (res == true) break;
            columns++;
        }
        return res;
    }

    public bool TryVertical(out int rows)
    {
        bool res = false;
        rows = 1;
        while( rows < height) {
            int i = rows - 1;
            int j = rows;
            res = true;
            while (i >= 0 && j < height) {
                if (lines[i] != lines[j]) {
                    res = false;
                    break;
                }
                i--;
                j++;
            }
            if (res == true) break;
            rows++;
        }
        return res;
    }

    public int Score()
    {
        if (TryHorizontal(out int cols)) {
            return cols;
        } else if (TryVertical(out int rows)) {
            return rows * 100;
        }
        return 0;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        foreach (string line in lines) {
            sb.AppendLine(line);
        }
        return sb.ToString();
    }
}

public class Program
{
    static readonly string[] testLines = [
        "#.##..##.",
        "..#.##.#.",
        "##......#",
        "##......#",
        "..#.##.#.",
        "..##..##.",
        "#.#.##.#.",
        "",
        "#...##..#",
        "#....#..#",
        "..##..###",
        "#####.##.",
        "#####.##.",
        "..##..###",
        "#....#..#",
    ];

    public static Pattern[] BuildPatterns(string[] lines)
    {
        List<Pattern> patterns = [];
        string[] groups = string.Join('\n', lines).Split("\n\n");
        foreach (string group in groups) {
            patterns.Add(new(group.Split('\n')));
        }
        return [.. patterns];
    }

    public static int Summarize(Pattern[] patterns, bool print=false)
    {
        int total = 0;
        foreach (Pattern p in patterns) {
            int s = p.Score();
            if (print) {
                Console.WriteLine(p);
            }
            total += s;
        }
        return total;
    }

    public static void Main(string[] args)
    {
        Pattern[] testPatterns = BuildPatterns(testLines);
        Console.WriteLine($"Part 1 Test: {Summarize(testPatterns)}");

        string[] lines = File.ReadAllLines("input.txt");
        Pattern[] patterns = BuildPatterns(lines);
        Console.WriteLine($"Part 1: {Summarize(patterns)}");
    }
}
