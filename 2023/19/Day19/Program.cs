using System.Text;

namespace Day19;

public class Rule
{
    readonly string? subject;
    readonly string? operation;
    readonly long? value;
    readonly string dest;

    public Rule(string line)
    {
        if (!line.Contains(':'))
        {
            dest = line;
        }
        else
        {
            string[] a = line.Split(':');
            dest = a[1];
            string[] b;
            if (a[0].Contains('>'))
            {
                b = a[0].Split('>');
                operation = ">";
            }
            else
            {
                b = a[0].Split('<');
                operation = "<";
            }
            subject = b[0];
            value = long.Parse(b[1]);
        }
    }

    public bool Check(Part p, out string dest)
    {
        dest = this.dest;
        if (subject is null)
        {
            return true;
        }

        if (
            (operation == ">" && p[subject] > value) ||
            (operation == "<" && p[subject] < value)
           )
        {
            return true;
        }

        return false;
    }

    public override string ToString()
    {
        if (subject is null)
        {
            return dest;
        }
        return $"{subject}{operation}:{value}";
    }
}

public class Workflow
{
    public readonly string name;
    readonly Rule[] rules = [];

    public Workflow(string line)
    {
        string[] a = line.Split('{');
        name = a[0];
        string[] b = a[1].Replace("}", string.Empty).Split(',');
        foreach (string r in b)
        {
            rules = [..rules, new(r)];
        }
    }

    public string GetDest(Part p)
    {
        foreach (Rule r in rules)
        {
            if (r.Check(p, out string dest))
            {
                return dest;
            }
        }
        return string.Empty;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        sb.AppendLine(name);
        foreach (Rule r in rules)
        {
            sb.Append('\t').Append(r);
            sb.AppendLine();
        }
        return sb.ToString();
    }
}

public class Part
{
    public readonly long x;
    public readonly long m;
    public readonly long a;
    public readonly long s;

    public bool Accepted = false;

    public long Score => x + m + a +s;

    public Part(string line)
    {
        string[] attrStrings = line
            .Replace("{", string.Empty)
            .Replace("}", string.Empty)
            .Split(',');
        
        foreach (string s in attrStrings)
        {
            string[] sp = s.Split('=');
            switch (sp[0])
            {
                case "x":
                    x = long.Parse(sp[1]);
                    break;
                case "m":
                    m = long.Parse(sp[1]);
                    break;
                case "a":
                    a = long.Parse(sp[1]);
                    break;
                case "s":
                    this.s = long.Parse(sp[1]);
                    break;
            }
        }
    }

    public long this[string index]
    {
        get
        {
            return index switch
            {
                "x" => x,
                "m" => m,
                "a" => a,
                "s" => s,
                _ => throw new IndexOutOfRangeException("oops"),
            };
        }
    }

    public override string ToString() => $"(x={x},m={m},a={a},s={s})";
}

public class Processor
{
    readonly Part[] parts = [];
    readonly Dictionary<string, Workflow> workflows = [];

    public Processor(string[] lines)
    {
        string[] split = string
            .Join("\n", lines)
            .Split("\n\n");
        foreach (string line in split[1].Split('\n'))
        {
            Part p = new(line);
            parts = [..parts, p];
        }
        foreach (string line in split[0].Split('\n'))
        {
            Workflow w = new(line);
            workflows[w.name] = w;
        }
        foreach (Part p in parts)
        {
            Workflow w;
            string d = "in";
            do
            {
                w = workflows[d];
                d = w.GetDest(p);
            }
            while (d != "A" && d != "R");
            if (d == "A")
            {
                p.Accepted = true;
            }
        }
    }

    public long Score
    {
        get 
        {
            long total = 0;
            foreach (Part p in parts)
            {
                if (p.Accepted)
                {
                    total += p.Score;
                }
            }
            return total;
        }
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        string[] testLines = File.ReadAllLines("testInput.txt");
        Processor p = new(testLines);
        Console.WriteLine($"Part 1 test: {p.Score}");
        string[] lines = File.ReadAllLines("input.txt");
        p = new(lines);
        Console.WriteLine($"Part 1: {p.Score}");
    }
}
