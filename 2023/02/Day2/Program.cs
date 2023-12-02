namespace Day2;

public class Game
{
    public int GameNo;
    private readonly Dictionary<string, int> MaxVals = [];
    private readonly Dictionary<string, int> MaxPossible;
    public Game(string gameStr, Dictionary<string, int> maxPossible)
    {
        MaxPossible = maxPossible;
        string[] firstSplit = gameStr.Replace("Game ", string.Empty).Split(": ");
        GameNo = int.Parse(firstSplit[0]);
        string[] draws = firstSplit[1].Split("; ");
        foreach (string draw in draws)
        {
            string[] cubes = draw.Split(", ");
            foreach (string cube in cubes)
            {
                string[] val = cube.Split(" ");
                int n = int.Parse(val[0]);
                string color = val[1];
                if (MaxVals.GetValueOrDefault(color, 0) < n)
                {
                    MaxVals[color] = n;
                }
            }
        }
    }

    public bool Possible()
    {
        bool possible = true;
        foreach (string key in MaxPossible.Keys)
        {
            if (MaxVals.GetValueOrDefault(key, 0) > MaxPossible[key])
            {
                possible = false;
                break;
            }
        }
        return possible;
    }

    public int Power()
    {
        int p = 1;
        foreach (string key in MaxVals.Keys)
        {
            p *= MaxVals[key];
        }
        return p;
    }

    public override string ToString()
    {
        return GameNo + ": " + Possible();
    }
}

public class Program
{
    static string[] GetLinesFromFile(string path)
    {
        return File.ReadAllLines(path);
    }

    public static void Main(string[] args)
    {
        string path = "input.txt";
        string[] lines = GetLinesFromFile(path);
        List<Game> games = [];
        Dictionary<string, int> maxPossible = new()
        {
            ["red"] = 12,
            ["green"] = 13,
            ["blue"] = 14
        };
        int part1 = 0;
        int part2 = 0;
        foreach (var line in lines)
        {
            var game = new Game(line, maxPossible);
            games.Add(game);
            if (game.Possible())
            {
                part1 += game.GameNo;
            }
            part2 += game.Power();
        }
        Console.WriteLine(part1.ToString());
        Console.WriteLine(part2.ToString());
    }
}
