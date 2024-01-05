#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
using System.Data.SqlTypes;
using System.Text;

namespace Day10;

public class Pipe(char type, int x, int y)
{
    public char type = type;
    public readonly int x = x;
    public readonly int y = y;

    public bool CanEnter(int i, int j) 
    {
        return type switch
        {
            '|' => i == x && (j == y + 1 || j == y - 1),
            '-' => j == y && (i == x + 1 || i == x - 1),
            'L' => (i == x && j == y - 1) || (j == y && i == x + 1),
            'J' => (i == x && j == y - 1) || (j == y && i == x - 1),
            '7' => (i == x && j == y + 1) || (j == y && i == x - 1),
            'F' => (i == x && j == y + 1) || (j == y && i == x + 1),
            _ => false,
        };
    }

    public string GetNext(int i, int j)
    {
        return type switch
        {
            '|' => (i == x && j == y + 1) ? $"{x},{y-1}" : $"{x},{y+1}",
            '-' => (j == y && i == x + 1) ? $"{x-1},{y}" : $"{x+1},{y}",
            'L' => (i == x + 1 && j == y) ? $"{x},{y-1}" : $"{x+1},{y}",
            'J' => (i == x - 1 && j == y) ? $"{x},{y-1}" : $"{x-1},{y}",
            '7' => (i == x - 1 && j == y) ? $"{x},{y+1}" : $"{x-1},{y}",
            'F' => (i == x + 1 && j == y) ? $"{x},{y+1}" : $"{x+1},{y}",
            _ => "",
        };
    }

    public string[] GetExits()
    {
        return type switch
        {
            '|' => [$"{x},{y-1}", $"{x},{y+1}"],
            '-' => [$"{x-1},{y}", $"{x+1},{y}"],
            'L' => [$"{x},{y-1}", $"{x+1},{y}"],
            'J' => [$"{x},{y-1}", $"{x-1},{y}"],
            '7' => [$"{x},{y+1}", $"{x-1},{y}"],
            'F' => [$"{x},{y+1}", $"{x+1},{y}"],
            _ => [],
        };
    }

    public override string ToString()
    {
        return type.ToString();
    }
}

public class Field
{
    Dictionary<string, Pipe> pipes = [];
    Pipe? startingPipe;
    readonly int height;
    readonly int width;

    public Field(string[] lines)
    {
        // initialize field
        height = lines.Length;
        width = lines[0].Length;
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                char c = lines[y][x];
                Pipe p = new(c, x, y);
                pipes[$"{x},{y}"] = p;
                if (c == 'S') {
                    startingPipe = p;
                }
            }
        }
        // find starting pipe type
        if (startingPipe is null) return;
        int sx = startingPipe.x;
        int sy = startingPipe.y;
        pipes.TryGetValue($"{sx},{sy-1}", out Pipe north);
        pipes.TryGetValue($"{sx},{sy+1}", out Pipe south);
        pipes.TryGetValue($"{sx-1},{sy}", out Pipe west);
        pipes.TryGetValue($"{sx+1},{sy}", out Pipe east);
        if (north is not null && north.CanEnter(sx, sy) && south is not null && south.CanEnter(sx, sy)) {
            startingPipe.type = '|';
        } else if (west is not null && west.CanEnter(sx, sy) && east is not null && east.CanEnter(sx, sy)) {
            startingPipe.type = '-';
        } else if (north is not null && north.CanEnter(sx, sy) && east is not null && east.CanEnter(sx, sy)) {
            startingPipe.type = 'L';
        } else if (north is not null && north.CanEnter(sx, sy) && west is not null && west.CanEnter(sx, sy)) {
            startingPipe.type = 'J';
        } else if (west is not null && west.CanEnter(sx, sy) && south is not null && south.CanEnter(sx, sy)) {
            startingPipe.type = '7';
        } else if (east is not null && east.CanEnter(sx, sy) && south is not null && south.CanEnter(sx, sy)) {
            startingPipe.type = 'F';
        }
    }

    public int GetDistance()
    {
        if (startingPipe is null) return 0;
        int dist = 1;
        string[] ps = startingPipe.GetExits();
        string s1 = ps[0];
        string s2 = ps[1];
        int x1 = startingPipe.x;
        int x2 = startingPipe.x;
        int y1 = startingPipe.y;
        int y2 = startingPipe.y;
        while (s1 != s2) {
            Pipe p1 = pipes[s1];
            Pipe p2 = pipes[s2];
            s1 = p1.GetNext(x1, y1);
            s2 = p2.GetNext(x2, y2);
            x1 = p1.x;
            y1 = p1.y;
            x2 = p2.x;
            y2 = p2.y;
            dist++;
        }
        return dist;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                string pos = $"{x},{y}";
                if (pipes.TryGetValue(pos, out Pipe p)) {
                    sb.Append(p);
                } else {
                    sb.Append('.');
                }
            }
            sb.AppendLine();
        }
        return sb.ToString();
    }
}

public class Program
{
    static readonly string[] testField = [
        ".....",
        ".S-7.",
        ".|.|.",
        ".L-J.",
        ".....",
    ];
    static readonly string[] testField2 = [
        "-L|F7",
        "7S-7|",
        "L|7||",
        "-L-J|",
        "L|-JF",
    ];
    static readonly string[] testField3 = [
       "..F7.",
        ".FJ|.",
        "SJ.L7",
        "|F--J",
        "LJ...",
    ];
    static readonly string[] testField4 = [
        "7-F7-",
        ".FJ|7",
        "SJLL7",
        "|F--J",
        "LJ.LJ",
    ];

    public static void Main(string[] args)
    {
        Field tf = new(testField);
        Console.WriteLine(tf);
        Console.WriteLine(tf.GetDistance());
        tf = new(testField2);
        Console.WriteLine(tf);
        Console.WriteLine(tf.GetDistance());
        tf = new(testField3);
        Console.WriteLine(tf);
        Console.WriteLine(tf.GetDistance());
        tf = new(testField4);
        Console.WriteLine(tf);
        Console.WriteLine(tf.GetDistance());

        string[] lines = File.ReadAllLines("input.txt");
        Field field = new(lines);
        Console.WriteLine(field);
        Console.WriteLine(field.GetDistance());
    }
}
