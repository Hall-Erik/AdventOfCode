using System.ComponentModel;
using System.Text;

namespace Day16;

public class Beam
{
    public int x;
    public int y;
    public int dx;
    public int dy;

    public Beam(int x, int y, int dx, int dy)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
}

public class ControlSurface
{
    readonly char typeChar;
    public readonly bool IsSplitter;

    public ControlSurface(char c)
    {
        typeChar = c;
        IsSplitter = c == '|' || c == '-';
    }

    private Beam[] Split(Beam b)
    {
        Beam[] res = [new(b.x + b.dx, b.y + b.dy, b.dx, b.dy)];
        
        if (typeChar == '|') {
            if (b.dx != 0) {
                res = [
                    new(b.x, b.y - 1, 0, -1),
                    new(b.x, b.y + 1, 0, 1),
                ];
            }
        } else {
            if (b.dy != 0) {
                res = [
                    new(b.x - 1, b.y, -1, 0),
                    new(b.x + 1, b.y, 1, 0),
                ];
            }
        }

        return res;
    }

    private Beam[] Reflect(Beam b)
    {
        int dx;
        int dy;
        if (typeChar == '\\') {
            dx = b.dy;
            dy = b.dx;
        } else {
            dx = -1 * b.dy;
            dy = -1 * b.dx;
        }
        return [new(b.x + dx, b.y + dy, dx, dy)];
    }

    public Beam[] GetNext(Beam b)
    {
        if (IsSplitter) {
            return Split(b);
        } else {
            return Reflect(b);
        }
    }

    public override string ToString()
    {
        return typeChar.ToString();
    }
}

public class Field
{
    readonly Dictionary<string, ControlSurface> field = [];
    readonly Dictionary<string, char> energized = [];
    readonly Dictionary<string, bool> moves = [];
    readonly Queue<Beam> beams = [];
    readonly int height;
    readonly int width;

    public Field(string[] lines, int startX=0, int startY=0, int startDx=1, int startDy=0)
    {
        beams.Enqueue(new(startX, startY, startDx, startDy));
        height = lines.Length;
        width = lines[0].Length;
        for (int j = 0; j < height; j++) {
            for (int i = 0; i < width; i++) {
                char c = lines[j][i];
                if (c != '.') {
                    field[$"{i},{j}"] = new(c);
                }
            }
        }

        while (beams.Count > 0) {
            Beam beam = beams.Dequeue();
            string move = $"{beam.x},{beam.y},{beam.dx},{beam.dy}";
            if (moves.ContainsKey(move)) continue;
            moves[move] = true;
            // Console.WriteLine(beams.Count);
            // Console.WriteLine($"Beam {beam.x} {beam.y} {beam.dx} {beam.y}");
            if (IsOOB(beam)) continue;
            string pos = $"{beam.x},{beam.y}";
            energized[pos] = '#';
            if (field.TryGetValue(pos, out var c)) {
                foreach (Beam b in c.GetNext(beam)) {
                    if (!IsOOB(b)) beams.Enqueue(b);
                }
            } else {
                Beam b = new(beam.x + beam.dx, beam.y + beam.dy, beam.dx, beam.dy);
                if (!IsOOB(b)) beams.Enqueue(b);
            }
        }
    }

    private bool IsOOB(Beam b)
    {
        return b.x < 0 || b.x >= width || b.y < 0 || b.y >= height;
    }

    public int CountEnergized()
    {
        return energized.Count;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        for (int j = 0; j < height; j++)
        {
            for (int i = 0; i < width; i++)
            {
                if (field.TryGetValue($"{i},{j}", out var c))
                {
                    sb.Append(c);
                } else {
                    sb.Append('.');
                }
            }
            sb.Append('\n');
        }
        sb.Append('\n');
        for (int j = 0; j < height; j++)
        {
            for (int i = 0; i < width; i++)
            {
                if (energized.TryGetValue($"{i},{j}", out var c))
                {
                    sb.Append(c);
                } else {
                    sb.Append('.');
                }
            }
            sb.Append('\n');
        }
        return sb.ToString();
    }
}

public class Configuration
{
    int max = 0;

    public Configuration(string[] lines)
    {
        int height = lines.Length;
        int width = lines[0].Length;
        Field f;

        for (int x = 0; x < width; x++) {
            // top row
            f = new(lines, x, 0, 0, 1);
            CheckSetMax(f);
            // bottom row
            f = new(lines, x, height - 1, 0, -1);
            CheckSetMax(f);
        }
        for (int y = 0; y < height; y++) {
            // left column
            f = new(lines, 0, y, 1, 0);
            CheckSetMax(f);
            // right column
            f = new(lines, width - 1, -1, 0);
            CheckSetMax(f);
        }
    }

    private void CheckSetMax(Field f)
    {
        int count = f.CountEnergized();
        if (count > max) {
            max = count;
        }
    }

    public int MaxEnergized => max;
}

public class Program
{
    static readonly string[] testLines = [
        @".|...\....",
        @"|.-.\.....",
        @".....|-...",
        @"........|.",
        @"..........",
        @".........\",
        @"..../.\\..",
        @".-.-/..|..",
        @".|....-|.\",
        @"..//.|....",
    ];

    public static void Main(string[] args)
    {
        Field testField = new(testLines);
        Console.WriteLine(testField);
        Console.WriteLine($"Part 1 Test: {testField.CountEnergized()}");

        string[] lines = File.ReadAllLines("input.txt");
        Field field = new(lines);
        Console.WriteLine(field);
        Console.WriteLine($"Part 1: {field.CountEnergized()}"); // 7472

        Configuration testConf = new(testLines);
        Console.WriteLine($"Part 2 Test: {testConf.MaxEnergized}");
        Configuration conf = new(lines);
        Console.WriteLine($"Part 2: {conf.MaxEnergized}"); // 7716
    }
}
