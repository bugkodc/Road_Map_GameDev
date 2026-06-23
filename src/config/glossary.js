// Shared technical glossary: terms that MUST stay in English in every translation (both
// directions), so domain meaning is preserved and keywords are consistent across the whole site.
//
// Rule for translators (human or LLM): translate prose naturally, but keep any term from this
// list verbatim in English. The first time a term appears in a paragraph you MAY add a short
// gloss in parentheses, e.g. "GameObject (đối tượng trong scene)", then use the English term
// afterwards. Never translate code, identifiers, API names, file names, or class names.
//
// Keep this list sorted within each group and extend it as new terms appear.

export const GLOSSARY = {
  // Engine-agnostic gamedev / engine concepts
  core: [
    'GameObject', 'Prefab', 'Component', 'Scene', 'Transform', 'Mesh', 'Material', 'Shader',
    'Texture', 'Sprite', 'Animation', 'Animator', 'Rigidbody', 'Collider', 'Raycast',
    'Coroutine', 'Asset', 'AssetBundle', 'Addressables', 'Scriptable Object', 'Frame',
    'Frame rate', 'Delta time', 'Viewport', 'Canvas', 'UI', 'Gizmo', 'Inspector', 'Hierarchy',
    'Editor', 'Runtime', 'Build', 'Gameplay', 'Level', 'Tilemap', 'Navmesh', 'Pathfinding',
    'Particle System', 'Post-processing', 'LOD', 'Batching', 'Draw call', 'Garbage Collection',
  ],

  // Unity specific
  unity: [
    'MonoBehaviour', 'ScriptableObject', 'Update', 'FixedUpdate', 'LateUpdate', 'Awake', 'Start',
    'OnEnable', 'OnDisable', 'OnDestroy', 'Input System', 'Cinemachine', 'URP', 'HDRP', 'DOTS',
    'Burst', 'Job System', 'Entity', 'NativeArray', 'UI Toolkit', 'VisualElement', 'UnityEvent',
    'NavMeshAgent', 'AssetDatabase', 'Assembly Definition',
  ],

  // Unreal specific
  unreal: [
    'Blueprint', 'Actor', 'Pawn', 'Character', 'Controller', 'GameMode', 'GameState',
    'PlayerState', 'UPROPERTY', 'UFUNCTION', 'UCLASS', 'Niagara', 'Lumen', 'Nanite', 'UMG',
    'Slate', 'Gameplay Framework', 'World', 'Level', 'Material Graph', 'Replication',
  ],

  // Design patterns / architecture (keep canonical pattern names in English)
  patterns: [
    'Singleton', 'Factory Method', 'Abstract Factory', 'Builder', 'Prototype', 'Adapter',
    'Bridge', 'Composite', 'Decorator', 'Facade', 'Flyweight', 'Proxy', 'Chain of Responsibility',
    'Command', 'Iterator', 'Mediator', 'Memento', 'Observer', 'State', 'Strategy',
    'Template Method', 'Visitor', 'Object Pool', 'Service Locator', 'Game Loop', 'Update Method',
    'Component', 'Event Queue', 'Spatial Partition', 'Double Buffer', 'Type Object',
    'Subclass Sandbox', 'Bytecode', 'Dirty Flag', 'Data Locality',
  ],

  // Refactoring / clean code
  refactoring: [
    'Refactoring', 'Code Smell', 'Clean Code', 'Technical Debt', 'Bloaters', 'Long Method',
    'Large Class', 'Primitive Obsession', 'Long Parameter List', 'Data Clumps', 'Switch Statements',
    'Feature Envy', 'Inappropriate Intimacy', 'Message Chains', 'Middle Man', 'Shotgun Surgery',
    'Divergent Change', 'Duplicate Code', 'Dead Code', 'Extract Method', 'Inline Method',
    'Extract Variable', 'Move Method', 'Encapsulate Field', 'Replace Conditional with Polymorphism',
  ],
};

// Flat, de-duplicated list for quick lookups.
export const GLOSSARY_TERMS = [...new Set(Object.values(GLOSSARY).flat())];
