# 🔄 Behavioral Design Patterns

> 📖 **Source:** [Refactoring.Guru — Behavioral Design Patterns](https://refactoring.guru/design-patterns/behavioral-patterns) | Author: Alexander Shvets

## What are Behavioral Patterns?

**Behavioral Design Patterns** focus on the **interaction, communication, and responsibility assignment** between objects. Instead of concerning themselves only with how objects are created (Creational) or how they are structured (Structural), this group of patterns deals with complex algorithms and control flows so that objects can collaborate effectively while still maintaining loose coupling.

> [!TIP]
> The core goal of this group of patterns is to make your system more flexible when changing behavior at runtime and to minimize direct dependencies between interacting modules.

---

## 📋 List of 10 Behavioral Design Patterns

Click each pattern below to see the most detailed explanation (complete with Problem, Solution, Structure, Pseudocode, Applicability, Pros & Cons, and C# Game Dev Code):

### 1. [Chain of Responsibility](./01-chain-of-responsibility.md)
Lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process it or to pass it to the next handler in the chain.

### 2. [Command](./02-command.md)
Turns a request or action into a standalone object that contains all information about that request. This transformation lets you parameterize methods, delay or queue the execution of a request, and support operations that can be undone (Undo/Redo).

### 3. [Iterator](./03-iterator.md)
Lets you traverse the elements of a collection sequentially without exposing its underlying representation (whether a list, stack, tree, or graph).

### 4. [Mediator](./04-mediator.md)
Reduces tight coupling and direct dependencies between classes by forcing them to communicate indirectly through a single mediator object.

### 5. [Memento](./05-memento.md)
Lets you save and restore the internal state of an object without violating the principle of encapsulation.

### 6. [Observer](./06-observer.md)
Defines a subscription mechanism to notify multiple objects (subscribers) about any events that happen to the object they are observing (publisher).

### 7. [State](./07-state.md)
Lets an object change its behavior when its internal state changes. It appears as if the object has changed its class at runtime.

### 8. [Strategy](./08-strategy.md)
Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime, allowing the algorithm to vary independently of the client that uses it.

### 9. [Template Method](./09-template-method.md)
Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its overall structure.

### 10. [Visitor](./10-visitor.md)
Lets you separate algorithms and behaviors from the objects on which they operate, allowing you to add new operations to existing object structures without modifying those classes.

---

## 📊 Quick Comparison Summary Table

| Pattern Name | Core Problem Solved | Concrete Example in Game Dev | Popularity in Game Dev |
|---------|---------------------------|----------------------------|------------------------|
| **Chain of Responsibility** | Processing a multi-step or multi-party request | Stacked damage calculation, UI Event Bubbling | ⭐⭐ |
| **Command** | Handling input, Undo/Redo, Replay | Input Mapping, undoing actions | ⭐⭐⭐ (Very important) |
| **Iterator** | Traversing complex lists/graphs | Traversing an Inventory, traversing waypoints on a map | ⭐⭐ |
| **Mediator** | Too many cross-linked UI/Managers | UI Window Manager, dialogue navigation panel | ⭐⭐⭐ |
| **Memento** | Save/Load game, Undo, Rollback | Saving Checkpoints, Network Rewind (network prediction) | ⭐⭐ |
| **Observer** | Decoupling system events | Event System (Player Health change notifies UI/SFX) | ⭐⭐⭐ (Very important) |
| **State** | Character/gameplay state machine | AI State Machine (Idle, Patrol, Chase, Attack) | ⭐⭐⭐ (Extremely common) |
| **Strategy** | Flexibly swapping algorithms | AI movement methods (A*, Flee, Chase, Wander) | ⭐⭐⭐ |
| **Template Method** | Avoiding duplication of algorithm structure | AI node-running structure, monster/card spawn cycle | ⭐⭐ |
| **Visitor** | Adding new features without modifying classes | Buff/Power-up system interacting with many Entity types | ⭐ |

---

## 🎮 Why Does Game Dev Need This Group of Patterns?

In game development, gameplay is essentially continuous interactive behaviors:
- **AI Optimization:** You will use **State** to create a state machine (FSM) for monsters and **Strategy** to change their movement algorithms.
- **Event System:** **Observer** is the backbone of every game engine (especially Unity Events and C# Actions), helping decouple Gameplay Logic from UI, Audio, and VFX.
- **Complex Calculations:** **Chain of Responsibility** helps you process a chain of buffs/debuffs affecting a character's final damage without writing spaghetti code.
- **Controlling Player Actions:** **Command** helps you store movement history, supporting Time Rewind or level Replay features.

---

⬅️ [Back to: Design Patterns Overview](../00-design-patterns-overview.md)
