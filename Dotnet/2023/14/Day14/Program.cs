using System.Text;

namespace Day14;

public class Field
{
    readonly Dictionary<string, char> rocks = [];
    readonly int height;
    readonly int width;

    public Field(string[] field)
    {
        height = field.Length;
        width = field[0].Length;
        for (int j = 0; j < height; j++)
        {
            for (int i = 0; i < width; i++)
            {
                char c = field[j][i];
                if (c == 'O' || c == '#')
                    rocks[$"{i},{j}"] = c;
            }
        }
    }

    public void Spin(int times)
    {
        Dictionary<string, int> iterations = [];
        int timesLeft = 0;
        int cycleAt = 0;
        int? cycleLength = null;
        string? cycleKey = null;
        for (int i = 0; i < times; i++)
        {
            string s = ToString();
            if (cycleKey == null && iterations.ContainsKey(s))
            {
                cycleAt = i;
                cycleKey = s;
            } else if (s == cycleKey)
            {
                timesLeft = times - i;
                cycleLength = i - cycleAt;
                break;
            }
            iterations[s] = i;
            SpinCycle();           
        }
        for (int i = 0; i < timesLeft % cycleLength; i++)
        {
            SpinCycle();
        }
    }

    public void SpinCycle()
    {
        TiltNorth();
        TiltWest();
        TiltSouth();
        TiltEast();
    }

    public void TiltNorth()
    {
        for (int j = 0; j < height; j++)
        {
            for (int i = 0; i < width; i++)
            {
                string key = $"{i},{j}";
                string next = $"{i},{j}";
                if (rocks.TryGetValue(key, out char r) && r == 'O')
                {
                    for (int y = j - 1; y >= 0; y--)
                    {
                        string n = $"{i},{y}";
                        if (rocks.ContainsKey(n)) break;
                        next = n;
                    }
                    if (next != key)
                    {
                        rocks.Remove(key);
                        rocks[next] = 'O';
                    }
                }
            }
        }
    }

    public void TiltWest()
    {
        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                string key = $"{i},{j}";
                string next = $"{i},{j}";
                if (rocks.TryGetValue(key, out char r) && r == 'O')
                {
                    for (int x = i - 1; x >= 0; x--)
                    {
                        string n = $"{x},{j}";
                        if (rocks.ContainsKey(n)) break;
                        next = n;
                    }
                    if (next != key)
                    {
                        rocks.Remove(key);
                        rocks[next] = 'O';
                    }
                }
            }
        }
    }

    public void TiltSouth()
    {
        for (int j = height - 1; j >= 0; j--)
        {
            for (int i = 0; i < width; i++)
            {
                string key = $"{i},{j}";
                string next = $"{i},{j}";
                if (rocks.TryGetValue(key, out char r) && r == 'O')
                {
                    for (int y = j + 1; y < height; y++)
                    {
                        string n = $"{i},{y}";
                        if (rocks.ContainsKey(n)) break;
                        next = n;
                    }
                    if (next != key)
                    {
                        rocks.Remove(key);
                        rocks[next] = 'O';
                    }
                }
            }
        }
    }

    public void TiltEast()
    {
        for (int i = width - 1; i >= 0; i--)
        {
            for (int j = 0; j < height; j++)
            {
                string key = $"{i},{j}";
                string next = $"{i},{j}";
                if (rocks.TryGetValue(key, out char r) && r == 'O')
                {
                    for (int x = i + 1; x < width; x++)
                    {
                        string n = $"{x},{j}";
                        if (rocks.ContainsKey(n)) break;
                        next = n;
                    }
                    if (next != key)
                    {
                        rocks.Remove(key);
                        rocks[next] = 'O';
                    }
                }
            }
        }
    }

    public int GetLoad()
    {
        int sum = 0;
        for (int j = 0; j < height; j++)
        {
            int load = height - j;
            for (int i = 0; i < width; i++)
            {
                if (rocks.TryGetValue($"{i},{j}", out char r) && r == 'O')
                {
                    sum += load;
                }
            }
        }
        return sum;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        for (int j = 0; j < height; j++)
        {
            for (int i = 0; i < width; i++)
            {
                char c;
                if (rocks.TryGetValue($"{i},{j}", out char val)) {
                    c = val;
                } else {
                    c = '.';
                }
                sb.Append(c);
            }
            sb.Append('\n');
        }
        return sb.ToString();
    }
}

public class Program
{
    static readonly string[] testLines = [
        "O....#....",
        "O.OO#....#",
        ".....##...",
        "OO.#O....O",
        ".O.....O#.",
        "O.#..O.#.#",
        "..O..#O..O",
        ".......O..",
        "#....###..",
        "#OO..#....",
    ];

    public static void Main(string[] args)
    {
        Field testField = new(testLines);
        Console.WriteLine(testField);
        testField.TiltNorth();
        Console.WriteLine(testField);
        Console.WriteLine($"Part 1 test: {testField.GetLoad()}");
        testField = new(testLines);
        testField.Spin(1000000000);
        Console.WriteLine(testField);
        Console.WriteLine($"Part 2 test: {testField.GetLoad()}");

        string [] lines = File.ReadAllLines("input.txt");
        Field f = new(lines);
        f.TiltNorth();
        Console.WriteLine($"Part 1: {f.GetLoad()}"); // 106648
        f = new(lines);
        f.Spin(1000000000);
        Console.WriteLine($"Part 2: {f.GetLoad()}"); // 87700
    }
}
