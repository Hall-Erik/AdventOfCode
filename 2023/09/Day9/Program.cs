using System.Text;

namespace Day9;

public class History
{
    readonly List<int[]> seqs = [];

    public History(string line)
    {
        // init
        string[] split = line.Split(" ");
        int[] seq = [];
        foreach (string s in split)
        {
            seq = [.. seq, int.Parse(s)];
        }
        seqs.Add([.. seq]);

        // part 1
        while (!seq.All(x => x == 0))
        {
            List<int> next = [];
            for (int i = 0; i < seq.Length - 1; i++)
            {
                int val = seq[i+1] - seq[i];
                next.Add(val);
            }
            seq = [.. next];
            seqs.Add(seq);
        }

        seqs[^1] = [.. seqs[^1], 0];

        for (int i = seqs.Count - 2; i >= 0; i--)
        {
            int a = seqs[i + 1][^1];
            int b = seqs[i][^1];
            int v = a + b;
            seqs[i] = [.. seqs[i], v];
        }

        // part 2
        seqs[^1] = [0, .. seqs[^1]];

        for (int i = seqs.Count - 2; i >= 0; i--)
        {
            int a = seqs[i + 1][0];
            int b = seqs[i][0];
            int v = b - a;
            seqs[i] = [v, .. seqs[i]];
        }
    }

    public override string ToString()
    {
        StringBuilder sb = new("");
        foreach (int[] seq in seqs)
        {
            foreach (int i in seq)
            {
                sb.Append(i + " ");
            }
            sb.Append('\n');
        }        
        return sb.ToString();
    }

    public int NextVal => seqs[0][^1];
    public int FistVal => seqs[0][0];
}


public class Program
{
    static readonly string[] testLines = [
        "0 3 6 9 12 15",
        "1 3 6 10 15 21",
        "10 13 16 21 30 45",
    ];

    public static List<History> BuildHistories(string[] lines)
    {
        List<History> hists = [];
        foreach (string line in lines)
        {
            History h = new(line);
            Console.WriteLine(h);
            hists.Add(h);
        }
        return hists;
    }

    public static int Part1(List<History> histories)
    {
        int sum = 0;
        foreach (History h in histories)
        {
            sum += h.NextVal;
        }
        return sum;
    }

    public static int Part2(List<History> histories)
    {
        int sum = 0;
        foreach (History h in histories)
        {
            sum += h.FistVal;
        }
        return sum;
    }

    public static void Main(string[] args)
    {
        List<History> testHists = BuildHistories(testLines);
        int lastSum = Part1(testHists);
        int firstSum = Part2(testHists);
        Console.WriteLine("Part 1 Test: " + lastSum);
        Console.WriteLine("Part 2 Test: " + firstSum);
        string[] lines = File.ReadAllLines("input.txt");
        List<History> hist = BuildHistories(lines);
        lastSum = Part1(hist);
        firstSum = Part2(hist);
        Console.WriteLine("Part 1: " + lastSum); // 2098530125
        Console.WriteLine("Part 2: " + firstSum);
    }
}
