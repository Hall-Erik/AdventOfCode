namespace Day8;

public class Fork
{
    public readonly string name;
    public readonly string left;
    public readonly string right;

    public Fork(string line)
    {
        string[] split1 = line.Split(" = ");
        name = split1[0];
        string[] split2 = split1[1]
            .Replace("(", string.Empty)
            .Replace(")", string.Empty)
            .Split(", ");
        left = split2[0];
        right = split2[1];
    }

    public string GetNext(char c)
    {
        if (c == 'L')
        {
            return left;
        }
        return right;
    }
}

public class Map
{
    readonly Dictionary<string, Fork> forks = [];
    readonly string directions;
    readonly string start = "AAA";
    readonly string end = "ZZZ";

    readonly List<string> starts = [];

    public Map(string[] lines)
    {
        directions = lines[0];
        for (int i = 2; i < lines.Length; i++)
        {
            Fork f = new(lines[i]);
            forks[f.name] = f;
            if (f.name.EndsWith('A'))
            {
                starts.Add(f.name);
            }
        }
    }

    public int CountSteps()
    {
        int steps = 0;
        string current = start;
        while (current != end)
        {
            Console.WriteLine(steps + " " + current);
            Fork fork = forks[current];
            char turn = directions[steps%directions.Length];
            steps++;
            current = fork.GetNext(turn);
        }
        return steps;
    }

    public int CountStepsParalell()
    {
        int steps = 0;
        string[] current = [.. starts];
        int[] endSteps = new int[current.Length];
        for (int i = 0; i < endSteps.Length; i++)
        {
            endSteps[i] = 0;
        }
        while (endSteps.Any(c => c == 0))
        {
            Console.Write(steps);
            for (int i = 0; i < current.Length; i++)
            {
                Console.Write(" " + current[i]);
                if (endSteps[i] == 0 && current[i].EndsWith('Z'))
                {
                    endSteps[i] = steps;
                }
                Fork fork = forks[current[i]];
                char turn = directions[steps%directions.Length];
                current[i] = fork.GetNext(turn);
            }
            Console.Write("\n");
            steps++;
        }
        Console.WriteLine("First stops: ");
        foreach (int ghost in endSteps)
        {
            Console.WriteLine(ghost);
        }
        return steps;
    }
}

public class Program
{
    static readonly string[] testLines1 = [
        "RL",
        "",
        "AAA = (BBB, CCC)",
        "BBB = (DDD, EEE)",
        "CCC = (ZZZ, GGG)",
        "DDD = (DDD, DDD)",
        "EEE = (EEE, EEE)",
        "GGG = (GGG, GGG)",
        "ZZZ = (ZZZ, ZZZ)",
    ];

    static readonly string[] testLines2 = [
        "LLR",
        "",
        "AAA = (BBB, BBB)",
        "BBB = (AAA, ZZZ)",
        "ZZZ = (ZZZ, ZZZ)",
    ];

    static readonly string[] testLines3 = [
        "LR",
        "",
        "11A = (11B, XXX)",
        "11B = (XXX, 11Z)",
        "11Z = (11B, XXX)",
        "22A = (22B, XXX)",
        "22B = (22C, 22C)",
        "22C = (22Z, 22Z)",
        "22Z = (22B, 22B)",
        "XXX = (XXX, XXX)",
    ];

    public static void Main(string[] args)
    {
        string[] lines = GetLinesFromFile("input.txt");
        Map testMap1 = new(testLines1);
        Map testMap2 = new(testLines2);
        Map map = new(lines);
        Map testMap3 = new(testLines3);
        Console.WriteLine("Pt1 Test1: " + testMap1.CountSteps());
        Console.WriteLine("Pt1 Test2: " + testMap2.CountSteps());
        Console.WriteLine("Pt1: " + map.CountSteps());
        testMap3.CountStepsParalell(); // Pt 2 test
        map.CountStepsParalell(); // Pt 2 (LCM is 10371555451871)
    }


    static string[] GetLinesFromFile(string path)
    {
        return File.ReadAllLines(path);
    }
}