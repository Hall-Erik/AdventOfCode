using System.Text;

namespace Day15;

public class HASH
{
    private int currentValue = 0;
    public int Value => currentValue;

    public HASH(string line)
    {
        foreach (char c in line) ComputeChar(c);
    }

    private void ComputeChar(char c)
    {
        int val = c;
        currentValue += val;
        currentValue *= 17;
        currentValue %= 256;
    }
}

public class Steps
{
    readonly List<HASH> hashes = [];
    readonly Box[] boxes = new Box[256];

    public Steps(string line)
    {
        string[] steps = line.Split(",");
        for (int i = 0; i < boxes.Length; i++) boxes[i] = new Box(i);
        foreach (string step in steps)
        {
            // Part 1
            hashes.Add(new(step));

            // Part 2
            if (step.Contains("-"))
            {
                string label = step.Replace("-", string.Empty);
                HASH h = new(label);
                boxes[h.Value].RemoveLense(label);

            } else {
                string[] split = step.Split('=');
                string label = split[0];
                int focalLength = int.Parse(split[1]);
                HASH h = new(label);
                boxes[h.Value].UpsertLense(new Lense(label, focalLength));
            }
        }
    }

    public int GetSum()
    {
        int sum = 0;
        foreach (HASH h in hashes)
        {
            sum += h.Value;
        }
        return sum;
    }

    public int FocussingPower() {
        int sum = 0;
        foreach (Box box in boxes)
        {
            if (box.lenses.Count == 0) continue;
            sum += box.FocussingPower();
        }
        return sum;
    }
}

public class Lense
{
    public readonly string label;
    public int focalLength;

    public Lense(string label, int focalLength)
    {
        this.label = label;
        this.focalLength = focalLength;
    }
}

public class Box
{
    public readonly int boxNum;
    public readonly List<Lense> lenses = [];
    readonly Dictionary<string, int> lenseMap = [];

    public Box(int n)
    {
        boxNum = n;
    }

    public void RemoveLense(string label)
    {
        if (lenseMap.TryGetValue(label, out int loc))
        {
            lenses.RemoveAt(loc);
            lenseMap.Remove(label);
            for (int i = 0; i < lenses.Count; i++) {
                lenseMap[lenses[i].label] = i;
            }
        }
    }

    public void UpsertLense(Lense lense)
    {
        if (lenseMap.TryGetValue(lense.label, out int loc))
        {
            lenses[loc] = lense;
        } else {
            lenseMap[lense.label] = lenses.Count;
            lenses.Add(lense);
        }
    }
    
    public int FocussingPower()
    {
        int sum = 0;
        for (int i = 0; i < lenses.Count; i++)
        {
            sum += (1 + boxNum) * (i + 1) * lenses[i].focalLength;
        }
        return sum;
    }
}

public class Program
{
    static readonly string testInput1 = "HASH";
    static readonly string testInput2 = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

    public static void Main(string[] args)
    {
        HASH h = new(testInput1);
        Console.WriteLine("Part 1 Test 1: " + h.Value);
        Steps s = new(testInput2);
        Console.WriteLine("Part 1 Test 2: " + s.GetSum());
        Console.WriteLine("Part 2 Test: " + s.FocussingPower());

        string line = File.ReadAllLines("input.txt")[0];
        s = new(line);
        Console.WriteLine("Part 1: " + s.GetSum()); // 515210
        Console.WriteLine("Part 2: " + s.FocussingPower()); // 246762

    }
}
