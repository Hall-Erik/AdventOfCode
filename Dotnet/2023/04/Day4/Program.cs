namespace Day4;

public class Card
{
    public readonly string cardNo;
    readonly List<int> winningNums = [];
    readonly List<int> cardNums = [];

    private int _copies = 1;

    public Card(string line)
    {
        string[] firstSplit = line
            .Replace("Card ", string.Empty)
            .Split(": ");
        cardNo = firstSplit[0];
        string[] secondSplit = firstSplit[1].Split(" | ");
        string[] w = secondSplit[0].Split(" ");
        string[] c = secondSplit[1].Split(" ");
        foreach (string num in w)
        {
            if (num == "") continue;
            winningNums.Add(int.Parse(num));
        }
        foreach (string num in c)
        {
            if (num == "") continue;
            cardNums.Add(int.Parse(num));
        }
    }

    public int Score()
    {
        int sum = 0;

        foreach (int n in cardNums)
        {
            if (winningNums.Contains(n))
            {
                sum = sum == 0 ? 1 : sum * 2;
            }
        }

        return sum;
    }

    public int MatchCount()
    {
        int sum = 0;

        foreach (int n in cardNums)
        {
            if (winningNums.Contains(n))
            {
                sum++;
            }
        }

        return sum;
    }

    public void IncCopies(int c)
    {
        _copies += c;
    }

    public int Copies => _copies;
}

public class Program
{
    private static readonly string[] testInput = [
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
        "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
        "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
        "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
        "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
        "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
    ];

    public static List<Card> GetCards(string[] lines)
    {
        List<Card> cards = [];
        foreach (string line in lines)
        {
            cards.Add(new Card(line));
        }
        return cards;
    }

    public static int ScoreCards(List<Card> cards)
    {
        int totalScore = 0;
        foreach (Card card in cards)
        {
            int score = card.Score();
            Console.WriteLine(card.cardNo + ": " + score);
            totalScore += score;
        }
        return totalScore;
    }

    public static int ScoreCardsPt2(List<Card> cards)
    {
        int totalCards = 0;
        int cardCount = cards.Count;
        for (int i = 0; i < cardCount; i++)
        {
            Card card = cards[i];
            int score = card.MatchCount();
            Console.WriteLine(card.cardNo + ": " + score);
            if (score > 0)
            {
                for (int j = i + 1; j < cardCount && j - i - 1 < score; j++)
                {
                    cards[j].IncCopies(card.Copies);
                }
            }
        }
        foreach (Card card in cards)
        {
            totalCards += card.Copies;
        }
        return totalCards;
    }

    public static void Main(string[] args)
    {
        List<Card> testCards = GetCards(testInput);
        int totalScore = ScoreCards(testCards);
        Console.WriteLine("Part 1 Test: " + totalScore);
        int totalCards = ScoreCardsPt2(testCards);
        Console.WriteLine("Part 2 Test: " + totalCards + "\n");
        string [] lines = GetLinesFromFile("input.txt");
        List<Card> cards = GetCards(lines);
        totalScore = ScoreCards(cards);
        Console.WriteLine("Part 1: " + totalScore); // 21105
        totalCards = ScoreCardsPt2(cards);
        Console.WriteLine("Part 2: " + totalCards);
    }

    static string[] GetLinesFromFile(string path)
    {
        return File.ReadAllLines(path);
    }
}

