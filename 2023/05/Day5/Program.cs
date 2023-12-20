using System.Text;

namespace Day5;

public class Range(long source, long dest, long range)
{
    readonly long source = source;
    readonly long dest = dest;
    readonly long range = range;

    public bool TryGetDest(long s, out long d)
    {
        if (s >= source && s <= source + range -1) {
            long dist = s - source;
            d = dest + dist;
            return true;
        }
        d = -1;
        return false;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        sb.AppendLine($"{source}-{source + range} => {dest}-{dest + range}");
        return sb.ToString();
    }
}

public class Map
{
    readonly List<Range> ranges = [];

    public void AddRange(Range r)
    {
        ranges.Add(r);
    }

    public long GetNext(long s)
    {
        foreach (Range range in ranges)
        {
            if (range.TryGetDest(s, out long d)) {
                return d;
            }
        }
        return s;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        foreach (Range r in ranges)
        {
            sb.AppendLine(r.ToString());
        }
        return sb.ToString();
    }
}

public class SeedRange(long start, long range)
{
    public readonly long start = start;
    public readonly long range = range;
    public readonly long end = start + range - 1;
}

public class Maps
{
    readonly List<long> Seeds = [];
    readonly List<SeedRange> seedRanges = [];
    readonly Map SeedToSoil = new();
    readonly Map SoilToFertilizer = new();
    readonly Map FertilizerToWater = new();
    readonly Map WaterToLight = new();
    readonly Map LightToTemp = new();
    readonly Map TempToHumidity = new();
    readonly Map HumidityToLocation = new();

    public Maps(string[] lines)
    {
        Map map = SeedToSoil;
        foreach (string line in lines) {
            if (line == "") continue;
            if (line.StartsWith("seeds: ")) {
                string[] seeds = line.Replace("seeds: ", string.Empty).Split(' ');
                foreach (string seed in seeds) {
                    Seeds.Add(long.Parse(seed));
                }
                for (int i = 0; i < Seeds.Count - 1; i += 2) {
                    seedRanges.Add(new(Seeds[i], Seeds[i+1]));
                }
            } else if (line.StartsWith("seed-to-soil")) {
                map = SeedToSoil;
            } else if (line.StartsWith("soil-to-fertilizer")) {
                map = SoilToFertilizer;
            } else if (line.StartsWith("fertilizer-to-water")) {
                map = FertilizerToWater;
            } else if (line.StartsWith("water-to-light")) {
                map = WaterToLight;
            } else if (line.StartsWith("light-to-temperature")) {
                map = LightToTemp;
            } else if (line.StartsWith("temperature-to-humidity")) {
                map = TempToHumidity;
            } else if (line.StartsWith("humidity-to-location")) {
                map = HumidityToLocation;
            } else {
                string[] split = line.Split(" ");
                long range = long.Parse(split[2]);
                long dest = long.Parse(split[0]);
                long source = long.Parse(split[1]);
                map.AddRange(new(source, dest, range));
            }
        }
    }

    public long LowestLoc()
    {
        long lowest = -1;
        foreach (long seed in Seeds)
        {
            long soil = SeedToSoil.GetNext(seed);
            long fertilizer = SoilToFertilizer.GetNext(soil);
            long water = FertilizerToWater.GetNext(fertilizer);
            long light = WaterToLight.GetNext(water);
            long temp = LightToTemp.GetNext(light);
            long hum = TempToHumidity.GetNext(temp);
            long loc = HumidityToLocation.GetNext(hum);
            if (lowest == -1 || loc < lowest) {
                lowest = loc;
            }
        }
        return lowest;
    }

    public long LowestLocPt2()
    {
        long lowest = -1;
        for (int i = 0; i < seedRanges.Count; i++)
        {
            SeedRange sr = seedRanges[i];
            Console.WriteLine($"Checking seed group {i} of {seedRanges.Count} ({sr.start}-{sr.end})");
            for (long seed = sr.start; seed <= sr.end; seed++) {
                long soil = SeedToSoil.GetNext(seed);
                long fertilizer = SoilToFertilizer.GetNext(soil);
                long water = FertilizerToWater.GetNext(fertilizer);
                long light = WaterToLight.GetNext(water);
                long temp = LightToTemp.GetNext(light);
                long hum = TempToHumidity.GetNext(temp);
                long loc = HumidityToLocation.GetNext(hum);
                if (lowest == -1 || loc < lowest) {
                    lowest = loc;
                }
            }
        }
        return lowest;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        sb.AppendLine($"Seeds: {string.Join(' ', Seeds)}");
        sb.AppendLine(SeedToSoil.ToString());
        sb.AppendLine(SoilToFertilizer.ToString());
        sb.AppendLine(FertilizerToWater.ToString());
        sb.AppendLine(WaterToLight.ToString());
        sb.AppendLine(LightToTemp.ToString());
        sb.AppendLine(TempToHumidity.ToString());
        sb.AppendLine(HumidityToLocation.ToString());
        return sb.ToString();
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        string[] testLines = File.ReadAllLines("testInput.txt");
        Maps testMaps = new(testLines);
        // Console.WriteLine(testMaps);
        Console.WriteLine($"Part 1 Test: {testMaps.LowestLoc()}");

        string[] lines = File.ReadAllLines("input.txt");
        Maps maps = new(lines);
        // Console.WriteLine(maps);
        Console.WriteLine($"Part 1: {maps.LowestLoc()}"); // 324724204

        Console.WriteLine($"Part 2 Test: {testMaps.LowestLocPt2()}");
        Console.WriteLine($"Part 2: {maps.LowestLocPt2()}"); // 104070862
    }
}
