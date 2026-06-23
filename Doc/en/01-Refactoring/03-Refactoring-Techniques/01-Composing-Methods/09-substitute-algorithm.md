# Substitute Algorithm

> 📖 **Source:** [Refactoring.Guru — Substitute Algorithm](https://refactoring.guru/substitute-algorithm) | Author: Alexander Shvets

## ❌ Problem

You want to **replace an existing algorithm** with a new version — one that's clearer, more efficient, or simpler.

```csharp
// ❌ The old algorithm — convoluted and hard to read
string FindPersonByName(string[] people, string name)
{
    for (int i = 0; i < people.Length; i++)
    {
        if (people[i].Equals("Don"))
            return "Don";
        if (people[i].Equals("John"))
            return "John";
        if (people[i].Equals("Kent"))
            return "Kent";
    }
    return "";
}
```

## ✅ Solution

**Replace the method's body** with the new, clearer and more efficient algorithm.

```csharp
// ✅ The new algorithm — simple and clear
string FindPersonByName(string[] people, string name)
{
    var candidates = new HashSet<string> { "Don", "John", "Kent" };
    
    foreach (string person in people)
    {
        if (candidates.Contains(person))
            return person;
    }
    return "";
}
```

## 🔍 Why Refactor

- **The old algorithm is convoluted**: A simpler approach has been found
- **A deeper understanding of the problem**: After fully grasping the requirement, you realize there's a better approach
- **Library/framework support**: A better solution is already available in a library
- **Performance**: The new algorithm is faster (e.g., from O(n²) down to O(n log n))
- **Changed requirements**: New requirements call for a different algorithm

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 📖 **Simpler code** | The new algorithm is usually clearer |
| ⚡ **Better performance** | A more optimal algorithm |
| 🔧 **Easier to maintain** | Simpler code = fewer hidden bugs |

## 📝 How to Refactor

1. **Make sure the method is well isolated** (Extract Method first if needed). The algorithm should sit neatly within a single method
2. **Write the new algorithm** alongside it (or replace it directly)
3. **Run all the tests** to ensure the results are the same
4. **Compare results**: If both produce the same output for every input, switch to the new algorithm
5. **Delete the old algorithm** if it's no longer needed

> 💡 **Tip**: Write thorough unit tests before swapping the algorithm. Tests help ensure the new algorithm works correctly.

## 🦨 Helps treat these Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — The new algorithm is usually shorter
- 🔗 [Duplicate Code](../../02-Code-Smells/04-Dispensables/01-duplicate-code.md) — The new algorithm can consolidate duplicated logic

## 🎮 In Game Dev

### Pathfinding — upgrading the algorithm:
```csharp
// ❌ Before — simple BFS
List<Node> FindPath(Node start, Node end)
{
    // BFS — not optimal for large grids
    Queue<Node> queue = new Queue<Node>();
    // ... 30 lines of BFS code
}

// ✅ After — more efficient A*
List<Node> FindPath(Node start, Node end)
{
    // A* — far more optimal
    var openSet = new PriorityQueue<Node>();
    // ... A* algorithm
}
```

### Sorting — using a built-in API:
```csharp
// ❌ Before — hand-written sort
void SortLeaderboard(List<PlayerScore> scores)
{
    // Hand-written bubble sort — 20 lines
    for (int i = 0; i < scores.Count; i++)
        for (int j = 0; j < scores.Count - 1; j++)
            // ...
}

// ✅ After — use LINQ/the API
void SortLeaderboard(List<PlayerScore> scores)
{
    scores.Sort((a, b) => b.score.CompareTo(a.score));
}
```

### Collision Detection:
```csharp
// ❌ Before — check all pairs, O(n²)
// ✅ After — use spatial partitioning (QuadTree, Grid), O(n log n)
```

### Notes for Game Dev:
- **Profile before optimizing**: Don't swap an algorithm just because it "seems slow"
- **A/B testing**: You can keep both algorithms and compare their performance
- **Unity has a lot built in**: Physics, NavMesh, DOTS — use the built-ins instead of writing your own

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Replace Method with Method Object](./08-replace-method-with-method-object.md)
- 🔗 [Refactoring Techniques](../00-techniques-overview.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
