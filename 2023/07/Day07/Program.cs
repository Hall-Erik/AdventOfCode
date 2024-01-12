#pragma warning disable CS8767 // Nullability of reference types in type of parameter doesn't match implicitly implemented member (possibly because of nullability attributes).

using System.Text;

namespace Day07;

public enum HandType
{
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}


public class Hand : IComparable<Hand>
{
    public readonly HandType type;
    private readonly string _hand;
    public readonly List<int> cards = [];

    public readonly int bid;
    private readonly bool _part2;

    public Hand(string hand, string bid, bool part2=false)
    {
        _part2 = part2;
        _hand = hand;
        this.bid = int.Parse(bid);

        foreach (char card in hand)
        {
            cards.Add(card switch
            {
                '2' => 2,
                '3' => 3,
                '4' => 4,
                '5' => 5,
                '6' => 6,
                '7' => 7,
                '8' => 8,
                '9' => 9,
                'T' => 10,
                'J' => _part2 ? 1 : 11,
                'Q' => 12,
                'K' => 13,
                _ => 14,
            });
        }        

        if (_part2) {
            var uniqueWithoutJ = _hand.Where(c => c != 'J').Distinct().ToArray();
            var totalJs = _hand.Where(c => c == 'J').Count();
            var totalUniqueWithoutJ = uniqueWithoutJ.Length;
            if (totalUniqueWithoutJ == 1 || totalJs == 5) {
                type = HandType.FiveOfAKind;
            } else if (totalUniqueWithoutJ == 2) {
                if (uniqueWithoutJ.Any(c => _hand.Count(x => x == c) + totalJs == 4)) {
                    type = HandType.FourOfAKind;
                } else if (uniqueWithoutJ.Any(c => _hand.Count(x => x == c) + totalJs == 3)) {
                    type = HandType.FullHouse;
                }
            } else if (totalUniqueWithoutJ == 3) {
                if (uniqueWithoutJ.Any(c => _hand.Count(x => x == c) + totalJs == 3)) {
                    type = HandType.ThreeOfAKind;
                } else {
                    type = HandType.TwoPair;
                }
            } else if (totalUniqueWithoutJ == 4) {
                type = HandType.OnePair;
            } else {
                type = HandType.HighCard;
            }
        } else if (!_part2) {
            var uniqueChars = _hand.Distinct().ToArray();
            var totalUnique = uniqueChars.Length;

            if (totalUnique == 1) {
                type = HandType.FiveOfAKind;
            } else if (totalUnique == 2) {
                if (uniqueChars.Any(c => _hand.Count(x => x == c) == 4)) {
                    type = HandType.FourOfAKind;
                } else if (uniqueChars.Any(c => _hand.Count(x => x == c) == 3)) {
                    type = HandType.FullHouse;
                }
            } else if (totalUnique == 3) {
                if (uniqueChars.Any(c => _hand.Count(x => x == c) == 3)) {
                    type = HandType.ThreeOfAKind;
                } else {
                    type = HandType.TwoPair;
                }
            } else if (totalUnique == 4) {
                type = HandType.OnePair;
            } else {
                type = HandType.HighCard;
            }
        }
    }


    public int CompareTo(Hand otherHand)
    {
        int result = type.CompareTo(otherHand.type);
        if (result == 0) {
            for (int i = 0; i < 5; i++) {
                int r = cards[i].CompareTo(otherHand.cards[i]);
                if (r != 0) {
                    result = r;
                    break;
                }
            }
        }
        return result;
    }

    public override string ToString()
    {
        StringBuilder sb = new();
        sb
            .Append(_hand)
            .Append(' ')
            .Append(type)
            .Append(' ')
            .Append(bid);
        return sb.ToString();
    }
}

public class Program
{
    public static readonly string[] testLines = [
        "32T3K 765",
        "T55J5 684",
        "KK677 28",
        "KTJJT 220",
        "QQQJA 483",
    ];

    public static int GetTotalWinnings(List<Hand> hands, bool printCards = true) {
        int total = 0;
        hands.Sort();
        for (int i = 0; i < hands.Count; i++) {
            int rank = i + 1;
            total += hands[i].bid * rank;
            if (printCards) Console.WriteLine(hands[i]);
        }
        return total;
    }

    public static void Main(string[] args) {
        List<Hand> testHands = [];
        List<Hand> testHands2 = [];
        foreach(string line in testLines) {
            string[] split = line.Split(' ');
            Hand h = new(split[0], split[1]);
            Hand h2 = new(split[0], split[1], true);
            Console.WriteLine(h2);
            testHands.Add(h);
            testHands2.Add(h2);
        }

        Console.WriteLine();
        Console.WriteLine($"Part 1 test: {GetTotalWinnings(testHands)}");
        Console.WriteLine();
        Console.WriteLine($"Part 2 test: {GetTotalWinnings(testHands2)}");

        string[] lines = File.ReadAllLines("input.txt");
        List<Hand> hands = [];
        List<Hand> hands2 = [];
        foreach(string line in lines) {
            string[] split = line.Split(' ');
            Hand h = new(split[0], split[1]);
            Hand h2 = new(split[0], split[1], true);
            hands.Add(h);
            hands2.Add(h2);
        }

        Console.WriteLine();
        Console.WriteLine($"Part 1: {GetTotalWinnings(hands, false)}");
        Console.WriteLine($"Part 2: {GetTotalWinnings(hands2, false)}");
    }
}
