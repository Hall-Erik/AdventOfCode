#pragma warning disable IDE0290 // Use primary constructor

using System.Text.RegularExpressions;

namespace Day6;


public class Race
{
    readonly long allowedTime;
    readonly long neededDist;
    readonly long startingSpeed = 0;
    readonly long deltaV = 1;

    public Race(string time, string dist)
    {
        allowedTime = long.Parse(time);
        neededDist = long.Parse(dist);
    }

    public long WaysToWin()
    {
        long ways = 0;
        for (long i = 0; i <= allowedTime; i++)
        {
            long heldTime = i;
            long timeLeft = allowedTime - heldTime;
            long speedReached = startingSpeed + deltaV * heldTime;
            long distanceCovered = timeLeft * speedReached;
            if (distanceCovered > neededDist)
            {
                ways++;
            }
        }
        return ways;
    }
}



public class Program
{
    static readonly string[] testInput = [
        "Time:      7  15   30",
        "Distance:  9  40  200",
    ];

    public static List<Race> GetRaces(string[] lines)
    {
        List<Race> races = [];
        string[] time = lines[0]
            .Replace("Time: ", string.Empty)
            .Split(" ");
        string[] dist = lines[1]
            .Replace("Distance: ", string.Empty)
            .Split(" ");
        for (int i = 0; i < time.Length; i++)
        {
            races.Add(new Race(time[i], dist[i]));
        }
        return races;
    }

    public static Race GetRace(string[] lines)
    {
        string time = lines[0].Replace("Time: ", string.Empty);
        string dist = lines[1].Replace("Distance: ", string.Empty);
        time = Regex.Replace(time, @"\s+", "");
        dist = Regex.Replace(dist, @"\s+", "");
        return new Race(time, dist);
    }

    public static long Part1(List<Race> races)
    {
        long mult = 1;
        foreach (Race race in races)
        {
            long wins = race.WaysToWin();
            mult *= wins;
            Console.WriteLine(wins);
        }
        return mult;
    }

    public static void Main(string[] args)
    {
        CleanUpStrings(testInput);
        List<Race> testRaces = GetRaces(testInput);
        Race testRace = GetRace(testInput);
        long mult = Part1(testRaces);
        Console.WriteLine("Part 1 Test: " + mult);
        Console.WriteLine("Part 2 Test: " + testRace.WaysToWin());
        string[] lines = GetLinesFromFile("input.txt");
        CleanUpStrings(lines);
        List<Race> races = GetRaces(lines);
        Race race = GetRace(lines);
        mult = Part1(races);
        Console.WriteLine("Part 1: " + mult);
        Console.WriteLine("Part 2: " + race.WaysToWin());
    }

    static void CleanUpStrings(string[] s)
    {
        for (int i = 0; i < s.Length; i++)
        {
            s[i] = Regex.Replace(s[i], @"\s+", " ");
        }
    }

    static string[] GetLinesFromFile(string path)
    {
        return File.ReadAllLines(path);
    }
}
