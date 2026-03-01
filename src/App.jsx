import { useState, useRef, useEffect, useCallback } from "react";

const LAYER_COLORS = {
  L1: { bg: "#1a1a2e", border: "#e94560", text: "#e94560", badge: "#e94560" },
  L2: { bg: "#1a1a2e", border: "#0f9b8e", text: "#0f9b8e", badge: "#0f9b8e" },
  L3: { bg: "#1a1a2e", border: "#f5a623", text: "#f5a623", badge: "#f5a623" },
  CLUSTER: { bg: "#0d0d1a", border: "#444466", text: "#ccccee" },
};

const CLUSTERS = [
  {
    id: "paradigms",
    label: "Programming Paradigms",
    icon: "◈",
    color: "#9b59b6",
    description:
      "The overarching philosophies that shape how you think and write code.",
    nodes: [
      {
        id: "procedural",
        label: "Procedural",
        layer: "L1",
        desc: "Step-by-step sequential instruction execution",
      },
      {
        id: "oop-paradigm",
        label: "Object-Oriented (OOP)",
        layer: "L1",
        desc: "Code organized around objects combining data and behavior",
      },
      {
        id: "functional-paradigm",
        label: "Functional",
        layer: "L1",
        desc: "Pure functions, no shared state, immutability",
      },
      {
        id: "declarative",
        label: "Declarative vs Imperative",
        layer: "L1",
        desc: "What to do vs how to do it",
      },
      {
        id: "event-driven",
        label: "Event-Driven",
        layer: "L1",
        desc: "Flow determined by events — user input, messages",
      },
      {
        id: "structured",
        label: "Structured",
        layer: "L1",
        desc: "Control structures instead of goto",
      },
    ],
  },
  {
    id: "variables-data",
    label: "Variables & Data",
    icon: "◉",
    color: "#e74c3c",
    description:
      "How data is stored, named, typed, and converted — from concept to Python syntax.",
    nodes: [
      {
        id: "vars-constants",
        label: "Variables & Constants",
        layer: "L1",
        desc: "Named storage; constants don't change",
      },
      {
        id: "data-types-l1",
        label: "Data Types (Primitive / Non-Primitive)",
        layer: "L1",
        desc: "int, float, bool, char vs arrays, objects",
      },
      {
        id: "type-systems",
        label: "Type Systems",
        layer: "L1",
        desc: "Static, Dynamic, Strong, Weak typing rules",
      },
      {
        id: "type-casting",
        label: "Type Casting & Coercion",
        layer: "L1",
        desc: "Explicit or implicit type conversion",
      },
      {
        id: "truthiness",
        label: "Truthiness & Falsiness",
        layer: "L1",
        desc: "How non-booleans evaluate in boolean context",
      },
      {
        id: "py-types",
        label: "Python Built-in Types",
        layer: "L3",
        desc: "int, float, complex, str, bool, bytes, None",
      },
      {
        id: "type-conversion",
        label: "Type Conversion in Python",
        layer: "L3",
        desc: "int(), str(), list(), float() conversions",
      },
      {
        id: "type-checking",
        label: "type() & isinstance()",
        layer: "L3",
        desc: "Runtime type inspection",
      },
      {
        id: "type-hints",
        label: "Type Hints & Annotations",
        layer: "L3",
        desc: "def f(x: int) -> str — static typing layer",
      },
      {
        id: "typing-module",
        label: "typing module",
        layer: "L3",
        desc: "List, Dict, Optional, Union, TypeVar, Protocol",
      },
      {
        id: "enum-module",
        label: "enum module",
        layer: "L3",
        desc: "Named constants with type safety — Enum, IntEnum, Flag",
      },
      {
        id: "encoding",
        label: "Encoding & Character Sets",
        layer: "L1",
        desc: "ASCII, Unicode, UTF-8",
      },
      {
        id: "ieee754",
        label: "Floating Point (IEEE 754)",
        layer: "L1",
        desc: "Why 0.1 + 0.2 ≠ 0.3 in binary",
      },
    ],
  },
  {
    id: "expressions-flow",
    label: "Expressions, Operators & Control Flow",
    icon: "⟡",
    color: "#e67e22",
    description:
      "The grammar of computation — how values combine, compare, and branch.",
    nodes: [
      {
        id: "expressions",
        label: "Expressions & Statements",
        layer: "L1",
        desc: "Expressions produce values; statements perform actions",
      },
      {
        id: "operators-l1",
        label: "Operators",
        layer: "L1",
        desc: "Arithmetic, Logical, Bitwise, Comparison, Assignment",
      },
      {
        id: "control-flow-l1",
        label: "Control Flow",
        layer: "L1",
        desc: "if/elif/else, match/switch — branching",
      },
      {
        id: "loops-l1",
        label: "Loops",
        layer: "L1",
        desc: "for, while, do-while — repetition",
      },
      {
        id: "operators-l3",
        label: "Python Operators In Depth",
        layer: "L3",
        desc: "is, in, :=  walrus, precedence rules",
      },
      {
        id: "control-flow-l3",
        label: "Python Control Flow",
        layer: "L3",
        desc: "break, continue, pass, else-on-loops",
      },
      {
        id: "match-statement",
        label: "match Statement (3.10+)",
        layer: "L3",
        desc: "Structural pattern matching — like switch on steroids",
      },
      {
        id: "pattern-matching",
        label: "Pattern Matching In Depth",
        layer: "L3",
        desc: "Literal, Capture, Wildcard, OR, Guard, Sequence patterns",
      },
    ],
  },
  {
    id: "functions",
    label: "Functions",
    icon: "ƒ",
    color: "#f1c40f",
    description:
      "The fundamental unit of reusable logic — from basic definitions to Python's advanced function features.",
    nodes: [
      {
        id: "functions-l1",
        label: "Functions (concept)",
        layer: "L1",
        desc: "Reusable blocks accepting input and returning output",
      },
      {
        id: "args-params",
        label: "Arguments vs Parameters",
        layer: "L1",
        desc: "Params in definition; args passed at call time",
      },
      {
        id: "return-values",
        label: "Return Values",
        layer: "L1",
        desc: "Value sent back from a function to the caller",
      },
      {
        id: "scope-l1",
        label: "Scope",
        layer: "L1",
        desc: "Local, Global, Enclosing, Built-in — LEGB rule",
      },
      {
        id: "namespaces",
        label: "Namespaces",
        layer: "L1",
        desc: "Mappings of names to objects; avoid naming conflicts",
      },
      {
        id: "recursion-l1",
        label: "Recursion",
        layer: "L1",
        desc: "Function calling itself with a base case",
      },
      {
        id: "functions-l3",
        label: "Python Functions In Depth",
        layer: "L3",
        desc: "*args, **kwargs, keyword-only, positional-only args",
      },
      {
        id: "lambda",
        label: "Lambda Functions",
        layer: "L3",
        desc: "Anonymous single-expression functions",
      },
      {
        id: "higher-order",
        label: "Higher-Order Functions",
        layer: "L3",
        desc: "map(), filter(), sorted(key=...) — functions as values",
      },
      {
        id: "closures",
        label: "Closures",
        layer: "L3",
        desc: "Function remembering its enclosing scope's variables",
      },
      {
        id: "decorators",
        label: "Decorators",
        layer: "L3",
        desc: "@decorator — wrap functions to modify behavior",
      },
      {
        id: "decorator-factories",
        label: "Decorator Factories",
        layer: "L3",
        desc: "Decorators that accept arguments: @repeat(3)",
      },
      {
        id: "global-nonlocal",
        label: "global & nonlocal",
        layer: "L3",
        desc: "Declare variable scope explicitly in nested contexts",
      },
      {
        id: "functools",
        label: "functools module",
        layer: "L3",
        desc: "lru_cache, partial, reduce, wraps",
      },
    ],
  },
  {
    id: "oop",
    label: "OOP & Methods",
    icon: "⬡",
    color: "#2ecc71",
    description:
      "From pillars and principles to Python classes, dunders, descriptors and metaclasses.",
    nodes: [
      {
        id: "oop-pillars",
        label: "OOP Pillars",
        layer: "L1",
        desc: "Abstraction, Encapsulation, Inheritance, Polymorphism",
      },
      {
        id: "composition",
        label: "Composition over Inheritance",
        layer: "L1",
        desc: "Combine objects rather than deep inheritance trees",
      },
      {
        id: "mixins",
        label: "Mixins",
        layer: "L1",
        desc: "Classes providing methods without being a parent",
      },
      {
        id: "method-classification",
        label: "Method Classification",
        layer: "L1",
        desc: "Accessor, Mutator, Transformer, Predicate, Command, Factory, Utility",
      },
      {
        id: "classes-l3",
        label: "Classes & Objects in Python",
        layer: "L3",
        desc: "class Dog: / rex = Dog() — blueprint and instance",
      },
      {
        id: "method-types",
        label: "Method Types in Python",
        layer: "L3",
        desc: "Instance, @classmethod, @staticmethod",
      },
      {
        id: "instance-class-vars",
        label: "Instance vs Class Variables",
        layer: "L3",
        desc: "Per-object vs shared across all instances",
      },
      {
        id: "inheritance-l3",
        label: "Inheritance & super()",
        layer: "L3",
        desc: "class Cat(Animal): / super() calls parent",
      },
      {
        id: "mro",
        label: "MRO & Multiple Inheritance",
        layer: "L3",
        desc: "C3 linearization — how Python resolves method lookup",
      },
      {
        id: "abstract-classes",
        label: "Abstract Classes (abc)",
        layer: "L3",
        desc: "@abstractmethod — interfaces in Python",
      },
      {
        id: "dataclasses",
        label: "Dataclasses (@dataclass)",
        layer: "L3",
        desc: "Auto-generate __init__, __repr__, __eq__",
      },
      {
        id: "property",
        label: "@property",
        layer: "L3",
        desc: "Getter/setter/deleter as computed attributes",
      },
      {
        id: "slots",
        label: "__slots__",
        layer: "L3",
        desc: "Restrict instance attributes for memory efficiency",
      },
      {
        id: "dunder",
        label: "Dunder (Magic) Methods",
        layer: "L3",
        desc: "__init__, __str__, __repr__, __eq__, __iter__, __enter__…",
      },
      {
        id: "descriptors",
        label: "Descriptors",
        layer: "L3",
        desc: "__get__/__set__/__delete__ — the engine behind @property",
      },
      {
        id: "metaclasses",
        label: "Metaclasses",
        layer: "L3",
        desc: "Classes whose instances are classes; type is default",
      },
      {
        id: "new-vs-init",
        label: "__new__ vs __init__",
        layer: "L3",
        desc: "__new__ creates; __init__ initializes",
      },
      {
        id: "weakref",
        label: "Weak References (weakref)",
        layer: "L3",
        desc: "References that don't prevent garbage collection",
      },
    ],
  },
  {
    id: "data-structures",
    label: "Data Structures",
    icon: "▦",
    color: "#1abc9c",
    description:
      "General data structure theory mapped to Python's built-in types and collections module.",
    nodes: [
      {
        id: "arrays",
        label: "Arrays",
        layer: "L1",
        desc: "Fixed-size ordered same-type collection",
      },
      {
        id: "linked-lists",
        label: "Linked Lists",
        layer: "L1",
        desc: "Nodes with pointers; fast insert/delete",
      },
      {
        id: "stacks-queues",
        label: "Stacks & Queues",
        layer: "L1",
        desc: "LIFO and FIFO structures",
      },
      {
        id: "hash-maps",
        label: "Hash Maps / Hash Tables",
        layer: "L1",
        desc: "Key-value with O(1) average lookup",
      },
      {
        id: "trees",
        label: "Trees (Binary, BST, AVL)",
        layer: "L1",
        desc: "Hierarchical; BST enables fast search",
      },
      {
        id: "graphs",
        label: "Graphs",
        layer: "L1",
        desc: "Vertices and edges; networks and paths",
      },
      {
        id: "heaps",
        label: "Heaps",
        layer: "L1",
        desc: "Tree satisfying heap property; priority queues",
      },
      {
        id: "sets-l1",
        label: "Sets (concept)",
        layer: "L1",
        desc: "Unordered unique elements",
      },
      {
        id: "immutable-ds",
        label: "Immutable & Persistent DS",
        layer: "L1",
        desc: "Never change; modifications produce new copies",
      },
      {
        id: "lists-l3",
        label: "Lists",
        layer: "L3",
        desc: "Mutable ordered sequences; indexing, slicing, methods",
      },
      {
        id: "tuples-l3",
        label: "Tuples",
        layer: "L3",
        desc: "Immutable ordered; namedtuple adds field names",
      },
      {
        id: "dicts-l3",
        label: "Dictionaries",
        layer: "L3",
        desc: "Ordered (3.7+) mutable key-value mapping",
      },
      {
        id: "sets-l3",
        label: "Sets & Frozensets",
        layer: "L3",
        desc: "Unique elements; union, intersection, difference",
      },
      {
        id: "comprehensions",
        label: "Comprehensions",
        layer: "L3",
        desc: "List, Dict, Set, Generator — concise collection syntax",
      },
      {
        id: "collections-module",
        label: "collections module",
        layer: "L3",
        desc: "defaultdict, Counter, deque, OrderedDict, namedtuple, ChainMap",
      },
    ],
  },
  {
    id: "algorithms",
    label: "Algorithms & Problem Solving",
    icon: "∑",
    color: "#3498db",
    description:
      "Language-agnostic computational thinking — complexity, searching, sorting, strategies.",
    nodes: [
      {
        id: "sorting",
        label: "Sorting Algorithms",
        layer: "L1",
        desc: "Bubble, Merge, Quick, Insertion, Heap Sort",
      },
      {
        id: "searching",
        label: "Searching Algorithms",
        layer: "L1",
        desc: "Linear O(n), Binary O(log n)",
      },
      {
        id: "big-o",
        label: "Time Complexity (Big O)",
        layer: "L1",
        desc: "How runtime grows with input size",
      },
      {
        id: "space-complexity",
        label: "Space Complexity",
        layer: "L1",
        desc: "How memory usage grows with input size",
      },
      {
        id: "recursion-vs-iter",
        label: "Recursion vs Iteration",
        layer: "L1",
        desc: "Two approaches; recursion uses the call stack",
      },
      {
        id: "divide-conquer",
        label: "Divide and Conquer",
        layer: "L1",
        desc: "Break problem into subproblems, combine results",
      },
      {
        id: "dynamic-prog",
        label: "Dynamic Programming",
        layer: "L1",
        desc: "Memoization / tabulation for overlapping subproblems",
      },
      {
        id: "greedy",
        label: "Greedy Algorithms",
        layer: "L1",
        desc: "Locally optimal choice at each step",
      },
      {
        id: "backtracking",
        label: "Backtracking",
        layer: "L1",
        desc: "Explore all possibilities; undo dead ends",
      },
      {
        id: "state-machines",
        label: "State Machines",
        layer: "L1",
        desc: "Finite states with transitions between them",
      },
    ],
  },
  {
    id: "memory-execution",
    label: "Memory & Execution",
    icon: "⚙",
    color: "#8e44ad",
    description:
      "How code runs — from compilation vs interpretation to Python's own memory model.",
    nodes: [
      {
        id: "stack-heap",
        label: "Stack vs Heap Memory",
        layer: "L1",
        desc: "Stack: function calls. Heap: dynamically allocated objects",
      },
      {
        id: "gc-l1",
        label: "Garbage Collection (concept)",
        layer: "L1",
        desc: "Automatic reclaiming of unused memory",
      },
      {
        id: "pointers",
        label: "Pointers & References",
        layer: "L1",
        desc: "Direct or indirect memory addresses",
      },
      {
        id: "compilation",
        label: "Compilation vs Interpretation",
        layer: "L1",
        desc: "Ahead-of-time vs runtime translation",
      },
      {
        id: "jit",
        label: "JIT Compilation",
        layer: "L1",
        desc: "Compiling bytecode to machine code at runtime",
      },
      {
        id: "bytecode-l1",
        label: "Bytecode (concept)",
        layer: "L1",
        desc: "Intermediate platform-independent code",
      },
      {
        id: "ast-l1",
        label: "Abstract Syntax Tree (AST)",
        layer: "L1",
        desc: "Tree representation of source code structure",
      },
      {
        id: "compiler-basics",
        label: "Compiler Design Basics",
        layer: "L1",
        desc: "Lexing → Parsing → AST → Code Generation",
      },
      {
        id: "pass-by",
        label: "Pass by Value vs Reference",
        layer: "L1",
        desc: "Copy vs reference to the actual memory object",
      },
      {
        id: "py-interning",
        label: "Interning",
        layer: "L3",
        desc: "Python caches small ints (-5 to 256) and some strings",
      },
      {
        id: "ref-counting",
        label: "Reference Counting",
        layer: "L3",
        desc: "Primary memory management; free when count hits zero",
      },
      {
        id: "gc-l3",
        label: "gc module",
        layer: "L3",
        desc: "Handles reference cycles ref counting can't free",
      },
      {
        id: "copy-module",
        label: "Shallow vs Deep Copy",
        layer: "L3",
        desc: "copy.copy() vs copy.deepcopy()",
      },
      {
        id: "memoryview",
        label: "Memory Views",
        layer: "L3",
        desc: "Access buffer data without copying",
      },
      {
        id: "dis-module",
        label: "dis module",
        layer: "L3",
        desc: "Disassemble Python bytecode to inspect instructions",
      },
      {
        id: "exec-model",
        label: "Python Execution Model",
        layer: "L3",
        desc: "Frames, code objects, and the call stack",
      },
      {
        id: "pycache",
        label: "__pycache__ & .pyc files",
        layer: "L2",
        desc: "Bytecode cache; speeds up re-runs",
      },
      {
        id: "importlib",
        label: "importlib",
        layer: "L2",
        desc: "Python's import system; customizable module loading",
      },
      {
        id: "cpython",
        label: "CPython",
        layer: "L2",
        desc: "The reference C implementation of Python",
      },
      {
        id: "cextensions",
        label: "C Extensions & Cython",
        layer: "L2",
        desc: "Write Python modules in C for performance",
      },
    ],
  },
  {
    id: "concurrency",
    label: "Concurrency & Parallelism",
    icon: "⇌",
    color: "#16a085",
    description:
      "Managing multiple things happening at once — theory through to Python's GIL and asyncio.",
    nodes: [
      {
        id: "concurrency-l1",
        label: "Concurrency (concept)",
        layer: "L1",
        desc: "Multiple tasks making progress over time",
      },
      {
        id: "parallelism-l1",
        label: "Parallelism (concept)",
        layer: "L1",
        desc: "Tasks running simultaneously on multiple processors",
      },
      {
        id: "multiprocessing-l1",
        label: "Multiprocessing (concept)",
        layer: "L1",
        desc: "Separate processes each with own memory space",
      },
      {
        id: "multithreading-l1",
        label: "Multithreading (concept)",
        layer: "L1",
        desc: "Multiple threads sharing one process's memory",
      },
      {
        id: "async-l1",
        label: "Async Programming (concept)",
        layer: "L1",
        desc: "Non-blocking; tasks yield control while waiting",
      },
      {
        id: "race-conditions",
        label: "Race Conditions",
        layer: "L1",
        desc: "Bugs from concurrent operations on shared state",
      },
      {
        id: "deadlocks",
        label: "Deadlocks",
        layer: "L1",
        desc: "Processes waiting on each other forever",
      },
      {
        id: "mutex",
        label: "Mutex & Locks",
        layer: "L1",
        desc: "Ensure only one thread accesses a resource",
      },
      {
        id: "gil",
        label: "GIL (Global Interpreter Lock)",
        layer: "L3",
        desc: "CPython lock preventing true parallel threads",
      },
      {
        id: "threading-l3",
        label: "threading module",
        layer: "L3",
        desc: "Threads share memory; limited by GIL for CPU tasks",
      },
      {
        id: "multiprocessing-l3",
        label: "multiprocessing module",
        layer: "L3",
        desc: "Bypass GIL with separate processes",
      },
      {
        id: "asyncio",
        label: "asyncio (async/await)",
        layer: "L3",
        desc: "Single-threaded I/O concurrency with event loops",
      },
      {
        id: "concurrent-futures",
        label: "concurrent.futures",
        layer: "L3",
        desc: "ThreadPoolExecutor, ProcessPoolExecutor",
      },
      {
        id: "thread-local",
        label: "threading.local",
        layer: "L3",
        desc: "Thread-local storage — unique data per thread",
      },
    ],
  },
  {
    id: "errors",
    label: "Error & Exception Handling",
    icon: "⚠",
    color: "#c0392b",
    description:
      "Anticipating and gracefully handling failure — from error types to Python's exception hierarchy.",
    nodes: [
      {
        id: "error-types",
        label: "Error Types",
        layer: "L1",
        desc: "Syntax, Runtime, Logic errors",
      },
      {
        id: "exceptions-l1",
        label: "Exceptions (concept)",
        layer: "L1",
        desc: "Structured signaling and handling of error conditions",
      },
      {
        id: "error-propagation",
        label: "Error Propagation",
        layer: "L1",
        desc: "Errors bubble up the call stack until caught",
      },
      {
        id: "defensive",
        label: "Defensive Programming",
        layer: "L1",
        desc: "Handle unexpected inputs/states proactively",
      },
      {
        id: "try-except",
        label: "try / except / else / finally",
        layer: "L3",
        desc: "Full Python exception handling block",
      },
      {
        id: "raise",
        label: "raise & Exception Chaining",
        layer: "L3",
        desc: "raise ValueError() / raise X from Y",
      },
      {
        id: "custom-exceptions",
        label: "Custom Exception Classes",
        layer: "L3",
        desc: "class MyError(Exception): pass",
      },
      {
        id: "assert",
        label: "assert statements",
        layer: "L3",
        desc: "Debug checks; disabled with -O flag",
      },
      {
        id: "built-in-exceptions",
        label: "Built-in Exceptions",
        layer: "L3",
        desc: "ValueError, TypeError, KeyError, IndexError…",
      },
      {
        id: "traceback-module",
        label: "traceback module",
        layer: "L3",
        desc: "Programmatically format and print stack traces",
      },
      {
        id: "warnings-module",
        label: "warnings module",
        layer: "L3",
        desc: "Non-fatal DeprecationWarning, UserWarning etc.",
      },
    ],
  },
  {
    id: "io-files",
    label: "I/O, Files & Networking",
    icon: "⇅",
    color: "#2980b9",
    description:
      "Reading, writing, sending — files, streams, sockets and serialization.",
    nodes: [
      {
        id: "io-l1",
        label: "I/O Operations (concept)",
        layer: "L1",
        desc: "Reading/writing to files, network, console",
      },
      {
        id: "streams",
        label: "Streams & Buffers",
        layer: "L1",
        desc: "Incremental data sequences; temporary holding memory",
      },
      {
        id: "sockets-l1",
        label: "Sockets (concept)",
        layer: "L1",
        desc: "Endpoints for machine-to-machine communication",
      },
      {
        id: "http-basics",
        label: "HTTP Basics",
        layer: "L1",
        desc: "GET/POST/PUT/DELETE, status codes, request/response",
      },
      {
        id: "serialization",
        label: "Serialization & Deserialization",
        layer: "L1",
        desc: "Converting objects to/from JSON, XML, CSV",
      },
      {
        id: "file-io-l3",
        label: "File I/O in Python",
        layer: "L3",
        desc: "open(), read(), write() — file modes r/w/a/rb",
      },
      {
        id: "with-open",
        label: "with open()",
        layer: "L3",
        desc: "Context manager pattern for safe file handling",
      },
      {
        id: "pathlib-l3",
        label: "pathlib module",
        layer: "L3",
        desc: "Path.exists(), glob(), read_text() — OO file paths",
      },
      {
        id: "csv-json",
        label: "CSV & JSON handling",
        layer: "L3",
        desc: "csv.reader(), json.load(), json.dumps()",
      },
      {
        id: "socket-module",
        label: "socket module",
        layer: "L3",
        desc: "TCP/UDP networking; low-level client/server building",
      },
      {
        id: "subprocess-module",
        label: "subprocess module",
        layer: "L3",
        desc: "Spawn child processes; capture stdout/stderr",
      },
      {
        id: "pickle-shelve",
        label: "pickle & shelve",
        layer: "L3",
        desc: "Binary object serialization and persistent storage",
      },
      {
        id: "struct-module",
        label: "struct module",
        layer: "L3",
        desc: "Pack/unpack binary data — network protocols, binary files",
      },
    ],
  },
  {
    id: "modules-packages",
    label: "Modules, Packages & Code Organization",
    icon: "⊞",
    color: "#7f8c8d",
    description:
      "How code is structured, shared, and distributed — from concepts to Python's ecosystem.",
    nodes: [
      {
        id: "functions-org",
        label: "Functions",
        layer: "L1",
        desc: "Named reusable units of logic",
      },
      {
        id: "classes-org",
        label: "Classes & Objects",
        layer: "L1",
        desc: "Blueprints (classes) and their instances",
      },
      {
        id: "modules-l1",
        label: "Modules (concept)",
        layer: "L1",
        desc: "Single files of related code",
      },
      {
        id: "packages-l1",
        label: "Packages (concept)",
        layer: "L1",
        desc: "Collections of modules in directories",
      },
      {
        id: "libraries-l1",
        label: "Libraries & Frameworks",
        layer: "L1",
        desc: "Reusable code (NumPy) vs opinionated platforms (Django)",
      },
      {
        id: "import-system",
        label: "import & from...import",
        layer: "L3",
        desc: "import os / from os import path / as aliasing",
      },
      {
        id: "init-py",
        label: "__init__.py & __all__",
        layer: "L3",
        desc: "Package init; controls what * exports",
      },
      {
        id: "future-imports",
        label: "__future__ imports",
        layer: "L3",
        desc: "Enable future language features in older Python",
      },
      {
        id: "project-layout",
        label: "Project Layout Conventions",
        layer: "L2",
        desc: "src/ layout vs flat; where tests, configs, docs go",
      },
      {
        id: "pyproject",
        label: "pyproject.toml & setup.py",
        layer: "L2",
        desc: "Modern project config (PEP 518)",
      },
      {
        id: "pip",
        label: "pip & PyPI",
        layer: "L2",
        desc: "Package manager; Python Package Index repository",
      },
      {
        id: "venv",
        label: "Virtual Environments",
        layer: "L2",
        desc: "venv, conda — isolated per-project Python",
      },
      {
        id: "poetry-pipenv",
        label: "poetry & pipenv",
        layer: "L2",
        desc: "Modern dependency management tools",
      },
      {
        id: "wheel-sdist",
        label: "wheel & sdist",
        layer: "L2",
        desc: "Binary vs source distribution formats",
      },
      {
        id: "twine",
        label: "twine",
        layer: "L2",
        desc: "Securely upload packages to PyPI",
      },
      {
        id: "namespace-packages",
        label: "Namespace Packages",
        layer: "L2",
        desc: "Packages without __init__.py",
      },
    ],
  },
  {
    id: "functional",
    label: "Functional Programming",
    icon: "λ",
    color: "#d35400",
    description:
      "Pure functions, immutability, and composition — concept through Python implementation.",
    nodes: [
      {
        id: "fp-paradigm",
        label: "Functional Paradigm",
        layer: "L1",
        desc: "Pure functions, no side effects, immutability",
      },
      {
        id: "pure-functions",
        label: "Pure Functions & Side Effects",
        layer: "L1",
        desc: "Same input → same output, no external changes",
      },
      {
        id: "monads",
        label: "Monads & Function Composition",
        layer: "L1",
        desc: "Chaining operations through a shared context/wrapper",
      },
      {
        id: "map-filter",
        label: "map() & filter()",
        layer: "L3",
        desc: "Apply function to elements / keep matching elements",
      },
      {
        id: "zip-enumerate",
        label: "zip() & enumerate()",
        layer: "L3",
        desc: "Pair iterables / add index counter",
      },
      {
        id: "reduce",
        label: "functools.reduce",
        layer: "L3",
        desc: "Fold a sequence into a single value",
      },
      {
        id: "partial",
        label: "functools.partial",
        layer: "L3",
        desc: "Create a function with some args pre-filled",
      },
      {
        id: "lru-cache",
        label: "functools.lru_cache",
        layer: "L3",
        desc: "Memoization decorator for expensive calls",
      },
      {
        id: "immutability-l3",
        label: "Immutability Patterns in Python",
        layer: "L3",
        desc: "Using tuples and frozensets to avoid mutation",
      },
    ],
  },
  {
    id: "iterators-generators",
    label: "Iterators & Generators",
    icon: "↻",
    color: "#27ae60",
    description:
      "Python's lazy evaluation protocol — how for loops really work under the hood.",
    nodes: [
      {
        id: "iterables",
        label: "Iterables vs Iterators",
        layer: "L3",
        desc: "Iterables can be looped; iterators do the looping",
      },
      {
        id: "iter-next",
        label: "iter() & next()",
        layer: "L3",
        desc: "Get iterator from object; fetch next value",
      },
      {
        id: "generators",
        label: "Generator Functions (yield)",
        layer: "L3",
        desc: "Lazy one-at-a-time value production",
      },
      {
        id: "generator-expr",
        label: "Generator Expressions",
        layer: "L3",
        desc: "(x*2 for x in range(10)) — lazy comprehensions",
      },
      {
        id: "itertools",
        label: "itertools module",
        layer: "L3",
        desc: "chain, cycle, islice, product, combinations, permutations",
      },
      {
        id: "context-managers",
        label: "Context Managers (with)",
        layer: "L3",
        desc: "__enter__/__exit__ protocol; contextlib",
      },
    ],
  },
  {
    id: "software-design",
    label: "Software Design",
    icon: "◎",
    color: "#2c3e50",
    description:
      "Principles, patterns, and practices for building maintainable, scalable systems.",
    nodes: [
      {
        id: "design-patterns",
        label: "Design Patterns",
        layer: "L1",
        desc: "Creational, Structural, Behavioral patterns",
      },
      {
        id: "solid",
        label: "SOLID Principles",
        layer: "L1",
        desc: "SRP, OCP, LSP, ISP, DIP",
      },
      {
        id: "dry-kiss",
        label: "DRY, KISS, YAGNI",
        layer: "L1",
        desc: "Don't Repeat Yourself, Keep It Simple, You Aren't Gonna Need It",
      },
      {
        id: "separation",
        label: "Separation of Concerns",
        layer: "L1",
        desc: "Distinct sections each addressing one concern",
      },
      {
        id: "mvc",
        label: "MVC / MVVM",
        layer: "L1",
        desc: "Architectural patterns separating data, UI, logic",
      },
      {
        id: "api-design",
        label: "API Design",
        layer: "L1",
        desc: "REST, RPC, GraphQL communication contracts",
      },
      {
        id: "coupling",
        label: "Coupling & Cohesion",
        layer: "L1",
        desc: "Low coupling + high cohesion = good design",
      },
      {
        id: "di",
        label: "Dependency Injection",
        layer: "L1",
        desc: "Provide dependencies from outside, not hardcoded",
      },
      {
        id: "code-smell",
        label: "Code Smell & Refactoring",
        layer: "L1",
        desc: "Recognize and improve structural problems",
      },
      {
        id: "docs-readability",
        label: "Documentation & Readability",
        layer: "L1",
        desc: "Clear code and docs as a discipline",
      },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    icon: "✓",
    color: "#16a085",
    description:
      "Verifying correctness — from testing strategies to Python testing frameworks.",
    nodes: [
      {
        id: "unit-testing-l1",
        label: "Unit Testing",
        layer: "L1",
        desc: "Testing individual functions/classes in isolation",
      },
      {
        id: "integration-testing",
        label: "Integration Testing",
        layer: "L1",
        desc: "Testing components working together",
      },
      {
        id: "e2e-testing",
        label: "End-to-End Testing",
        layer: "L1",
        desc: "Full application flow from user perspective",
      },
      {
        id: "tdd",
        label: "TDD",
        layer: "L1",
        desc: "Write tests before writing the actual code",
      },
      {
        id: "mocking-l1",
        label: "Mocking & Stubbing",
        layer: "L1",
        desc: "Replacing real dependencies with controlled fakes",
      },
      {
        id: "coverage",
        label: "Code Coverage",
        layer: "L1",
        desc: "% of code exercised by tests",
      },
      {
        id: "unittest",
        label: "unittest",
        layer: "L3",
        desc: "Built-in class-based testing framework",
      },
      {
        id: "pytest",
        label: "pytest",
        layer: "L3",
        desc: "Simple syntax, powerful fixtures, plugins",
      },
      {
        id: "fixtures",
        label: "Fixtures",
        layer: "L3",
        desc: "@pytest.fixture — setup/teardown test context",
      },
      {
        id: "mock",
        label: "unittest.mock",
        layer: "L3",
        desc: "MagicMock, patch — controllable fakes",
      },
      {
        id: "tox-nox",
        label: "tox & nox",
        layer: "L2",
        desc: "Multi-environment test runners",
      },
      {
        id: "pre-commit",
        label: "pre-commit hooks",
        layer: "L2",
        desc: "Run linters/formatters before each git commit",
      },
    ],
  },
  {
    id: "python-env",
    label: "Python Environment",
    icon: "⌬",
    color: "#8e44ad",
    description:
      "How Python runs, where it lives, and the ecosystem around it.",
    nodes: [
      {
        id: "what-python-is",
        label: "What Python Is",
        layer: "L2",
        desc: "Interpreted, dynamically typed, high-level, general-purpose",
      },
      {
        id: "python-versions",
        label: "Python Versions & pyenv",
        layer: "L2",
        desc: "Python 2 vs 3; version management",
      },
      {
        id: "python-distros",
        label: "Python Distros",
        layer: "L2",
        desc: "Anaconda, Miniconda, PyPy, ActivePython",
      },
      {
        id: "repl",
        label: "REPL & Interactive Python",
        layer: "L2",
        desc: "Read-Eval-Print Loop; IPython; Jupyter",
      },
      {
        id: "script-mode",
        label: "Script Mode",
        layer: "L2",
        desc: "python script.py — non-interactive execution",
      },
      {
        id: "python-cli",
        label: "Python CLI",
        layer: "L2",
        desc: "python, python3, -c, -m flags",
      },
      {
        id: "jupyter",
        label: "Jupyter Notebook / Lab",
        layer: "L2",
        desc: "Browser-based code + output + markdown environment",
      },
      {
        id: "kernel",
        label: "Python Kernel",
        layer: "L2",
        desc: "Execution engine behind Jupyter notebooks",
      },
      {
        id: "global-env",
        label: "Global vs Virtual Environment",
        layer: "L2",
        desc: "System-wide vs isolated per-project Python",
      },
      {
        id: "pep8",
        label: "PEP 8 & PEPs",
        layer: "L2",
        desc: "Official style guide and enhancement proposals",
      },
      {
        id: "tooling",
        label: "Linters, Formatters, Type Checkers",
        layer: "L2",
        desc: "flake8, black, mypy, pyright",
      },
      {
        id: "pyi-stubs",
        label: "Type Stub Files (.pyi)",
        layer: "L2",
        desc: "Annotation-only files for untyped libraries",
      },
    ],
  },
  {
    id: "regex",
    label: "Regular Expressions",
    icon: ".*",
    color: "#e67e22",
    description:
      "Pattern matching in text — the language of regex mapped to Python's re module.",
    nodes: [
      {
        id: "regex-concept",
        label: "Regular Expressions (concept)",
        layer: "L1",
        desc: "Language for describing patterns in text",
      },
      {
        id: "re-module",
        label: "re module",
        layer: "L3",
        desc: "Python's built-in regex engine",
      },
      {
        id: "patterns",
        label: "Patterns & Metacharacters",
        layer: "L3",
        desc: ". * + ? ^ $ [] — the regex alphabet",
      },
      {
        id: "re-functions",
        label: "match / search / findall / sub",
        layer: "L3",
        desc: "The main re functions and their differences",
      },
      {
        id: "re-compile",
        label: "re.compile()",
        layer: "L3",
        desc: "Pre-compile patterns for reuse and performance",
      },
      {
        id: "groups",
        label: "Groups & Capturing",
        layer: "L3",
        desc: "(pattern) captures; (?:pattern) non-capturing",
      },
      {
        id: "raw-strings",
        label: 'Raw Strings r"..."',
        layer: "L3",
        desc: "Avoid double-escaping backslashes in regex",
      },
    ],
  },
  {
    id: "security-devops",
    label: "Security & DevOps",
    icon: "⛨",
    color: "#c0392b",
    description:
      "Keeping code safe, deployable, and reproducible in the real world.",
    nodes: [
      {
        id: "sql-injection",
        label: "SQL Injection & XSS",
        layer: "L1",
        desc: "Malicious input attacks on databases and browsers",
      },
      {
        id: "auth",
        label: "Authentication vs Authorization",
        layer: "L1",
        desc: "Identity verification vs permission checking",
      },
      {
        id: "hashing-encryption",
        label: "Hashing & Encryption",
        layer: "L1",
        desc: "One-way (bcrypt) vs two-way (AES/RSA)",
      },
      {
        id: "https-tls",
        label: "HTTPS & TLS",
        layer: "L1",
        desc: "Encrypted HTTP; TLS is the underlying protocol",
      },
      {
        id: "secrets",
        label: "Secrets Management",
        layer: "L1",
        desc: "Never hardcode keys; use env vars or vaults",
      },
      {
        id: "cicd",
        label: "CI/CD",
        layer: "L1",
        desc: "Auto build/test on commit; auto deploy on success",
      },
      {
        id: "docker",
        label: "Containerization (Docker)",
        layer: "L1",
        desc: "Portable app + dependencies in a container image",
      },
      {
        id: "env-parity",
        label: "Environment Parity",
        layer: "L1",
        desc: "Dev, staging, prod as identical as possible",
      },
      {
        id: "git",
        label: "Version Control (Git)",
        layer: "L1",
        desc: "commit, branch, merge, rebase, PR, code review",
      },
      {
        id: "iac",
        label: "Infrastructure as Code",
        layer: "L1",
        desc: "Manage infrastructure through config files",
      },
    ],
  },
  {
    id: "libraries",
    label: "Python Libraries & Domains",
    icon: "⬡",
    color: "#2980b9",
    description: "The Python ecosystem — major libraries by domain.",
    nodes: [
      {
        id: "numpy-pandas",
        label: "numpy & pandas",
        layer: "L3",
        desc: "Arrays/math and DataFrames/tabular data",
      },
      {
        id: "visualization",
        label: "matplotlib / seaborn / plotly",
        layer: "L3",
        desc: "Data visualization libraries",
      },
      {
        id: "web-frameworks",
        label: "flask / fastapi / django",
        layer: "L3",
        desc: "Micro, async, and full-stack web frameworks",
      },
      {
        id: "http-clients",
        label: "requests & httpx",
        layer: "L3",
        desc: "HTTP client libraries",
      },
      {
        id: "cli-tools",
        label: "argparse & click",
        layer: "L3",
        desc: "CLI argument parsing and decorator-based CLI",
      },
      {
        id: "automation",
        label: "selenium / playwright / bs4",
        layer: "L3",
        desc: "Browser automation and web scraping",
      },
      {
        id: "ml",
        label: "scikit-learn / torch / tf",
        layer: "L3",
        desc: "Machine learning and deep learning",
      },
      {
        id: "database",
        label: "sqlalchemy / sqlite3",
        layer: "L3",
        desc: "ORM and database connectivity",
      },
      {
        id: "config",
        label: "pydantic / dotenv",
        layer: "L3",
        desc: "Data validation and config management",
      },
      {
        id: "tasks",
        label: "celery / schedule",
        layer: "L3",
        desc: "Task queues and scheduling",
      },
    ],
  },
];

const LAYER_LABELS = {
  L1: "Core Programming",
  L2: "Python Ecosystem",
  L3: "Python In Depth",
};

const LAYER_BADGE_COLORS = {
  L1: "bg-red-900 text-red-300 border-red-700",
  L2: "bg-teal-900 text-teal-300 border-teal-700",
  L3: "bg-amber-900 text-amber-300 border-amber-700",
};

export default function PythonMindMap() {
  const [selected, setSelected] = useState(null);
  const [expandedCluster, setExpandedCluster] = useState(null);
  const [search, setSearch] = useState("");
  const [filterLayer, setFilterLayer] = useState("ALL");
  const [view, setView] = useState("map"); // "map" | "list"

  const searchLower = search.toLowerCase();

  const filteredClusters = CLUSTERS.map((cluster) => ({
    ...cluster,
    nodes: cluster.nodes.filter((n) => {
      const matchesSearch =
        !searchLower ||
        n.label.toLowerCase().includes(searchLower) ||
        n.desc.toLowerCase().includes(searchLower) ||
        cluster.label.toLowerCase().includes(searchLower);
      const matchesLayer = filterLayer === "ALL" || n.layer === filterLayer;
      return matchesSearch && matchesLayer;
    }),
  })).filter((c) => c.nodes.length > 0);

  const totalNodes = CLUSTERS.reduce((acc, c) => acc + c.nodes.length, 0);

  return (
    <div
      style={{
        background: "#07071a",
        minHeight: "100vh",
        fontFamily: "'Courier New', monospace",
        color: "#c8c8e8",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #1a1a3a",
          padding: "24px 32px 20px",
          background: "linear-gradient(180deg, #0a0a20 0%, #07071a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 4,
                color: "#555588",
                marginBottom: 6,
                textTransform: "uppercase",
              }}
            >
              Learning Path
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: "#eeeeff",
                letterSpacing: -0.5,
              }}
            >
              Python Concept Mind Map
            </h1>
            <div style={{ marginTop: 8, fontSize: 13, color: "#666699" }}>
              {CLUSTERS.length} clusters · {totalNodes} concepts across 3 layers
            </div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "#7777aa",
                }}
              >
                <span style={{ color: "#4444aa", fontSize: 14 }}>◈</span>
                By{" "}
                <span
                  style={{
                    color: "#aaaaff",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    borderBottom: "1px solid #3333aa",
                    paddingBottom: 1,
                  }}
                >
                  Devian
                </span>
              </span>
              <span style={{ color: "#222244", fontSize: 12 }}>·</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "#555577",
                }}
              >
                <span style={{ fontSize: 11 }}>⏱</span>
                Last updated{" "}
                <span style={{ color: "#7777aa" }}>March 2026</span>
              </span>
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {[
              ["L1", "#e94560", "Core Programming"],
              ["L2", "#0f9b8e", "Python Ecosystem"],
              ["L3", "#f5a623", "Python In Depth"],
            ].map(([layer, color, label]) => (
              <button
                key={layer}
                onClick={() =>
                  setFilterLayer(filterLayer === layer ? "ALL" : layer)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background:
                    filterLayer === layer ? `${color}22` : "transparent",
                  border: `1px solid ${
                    filterLayer === layer ? color : "#2a2a4a"
                  }`,
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: filterLayer === layer ? color : "#888899",
                  fontSize: 12,
                  transition: "all 0.15s",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    display: "inline-block",
                  }}
                />
                <span>{layer}</span>
                <span style={{ opacity: 0.6 }}>—</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search + View toggle */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#444466",
                fontSize: 14,
              }}
            >
              ⌕
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              style={{
                width: "100%",
                paddingLeft: 36,
                paddingRight: 12,
                paddingTop: 8,
                paddingBottom: 8,
                background: "#0d0d22",
                border: "1px solid #1e1e3a",
                borderRadius: 8,
                color: "#c8c8e8",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              ["map", "⊞ Map"],
              ["list", "≡ List"],
            ].map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor: view === v ? "#3333aa" : "#1e1e3a",
                  background: view === v ? "#1a1a40" : "transparent",
                  color: view === v ? "#aaaaff" : "#555588",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "28px 32px" }}>
        {view === "map" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {filteredClusters.map((cluster) => (
              <ClusterCard
                key={cluster.id}
                cluster={cluster}
                expanded={expandedCluster === cluster.id}
                onToggle={() =>
                  setExpandedCluster(
                    expandedCluster === cluster.id ? null : cluster.id
                  )
                }
                selected={selected}
                onSelectNode={setSelected}
                filterLayer={filterLayer}
              />
            ))}
          </div>
        ) : (
          <ListView
            clusters={filteredClusters}
            selected={selected}
            onSelectNode={setSelected}
          />
        )}

        {filteredClusters.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#444466" }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>◌</div>
            <div>No concepts match your search</div>
          </div>
        )}
      </div>

      {/* Node detail panel */}
      {selected && (
        <NodePanel node={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function ClusterCard({
  cluster,
  expanded,
  onToggle,
  selected,
  onSelectNode,
  filterLayer,
}) {
  const visibleNodes = cluster.nodes;
  const previewNodes = expanded ? visibleNodes : visibleNodes.slice(0, 4);
  const hasMore = visibleNodes.length > 4;

  const layerCounts = { L1: 0, L2: 0, L3: 0 };
  visibleNodes.forEach((n) => layerCounts[n.layer]++);

  return (
    <div
      style={{
        background: "#0d0d22",
        border: `1px solid ${expanded ? cluster.color + "60" : "#1a1a35"}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: expanded
          ? `0 0 0 1px ${cluster.color}30, 0 8px 32px ${cluster.color}15`
          : "none",
      }}
    >
      {/* Cluster header */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "16px 18px",
          background: "none",
          border: "none",
          cursor: "pointer",
          borderBottom: `1px solid ${
            expanded ? cluster.color + "30" : "#111130"
          }`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 18,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: `${cluster.color}18`,
                color: cluster.color,
                flexShrink: 0,
              }}
            >
              {cluster.icon}
            </span>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ddddff",
                  letterSpacing: 0.3,
                }}
              >
                {cluster.label}
              </div>
              <div style={{ fontSize: 11, color: "#444466", marginTop: 2 }}>
                {visibleNodes.length} concepts
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {[
                ["L1", "#e94560"],
                ["L2", "#0f9b8e"],
                ["L3", "#f5a623"],
              ].map(([l, c]) =>
                layerCounts[l] > 0 ? (
                  <span
                    key={l}
                    style={{
                      fontSize: 10,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: `${c}22`,
                      color: c,
                      border: `1px solid ${c}44`,
                    }}
                  >
                    {l}:{layerCounts[l]}
                  </span>
                ) : null
              )}
            </div>
            <span style={{ color: "#333355", fontSize: 12 }}>
              {expanded ? "▲" : "▼"}
            </span>
          </div>
        </div>

        {expanded && (
          <div
            style={{
              fontSize: 12,
              color: "#555577",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            {cluster.description}
          </div>
        )}
      </button>

      {/* Nodes */}
      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {previewNodes.map((node) => (
          <NodePill
            key={node.id}
            node={node}
            isSelected={selected?.id === node.id}
            onClick={() => onSelectNode(selected?.id === node.id ? null : node)}
            color={cluster.color}
          />
        ))}

        {!expanded && hasMore && (
          <button
            onClick={onToggle}
            style={{
              marginTop: 4,
              padding: "6px 10px",
              background: "none",
              border: `1px dashed ${cluster.color}44`,
              borderRadius: 6,
              color: cluster.color + "99",
              fontSize: 11,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            +{visibleNodes.length - 4} more — click to expand
          </button>
        )}
      </div>
    </div>
  );
}

function NodePill({ node, isSelected, onClick, color }) {
  const layerColors = { L1: "#e94560", L2: "#0f9b8e", L3: "#f5a623" };
  const lc = layerColors[node.layer];

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 10px",
        background: isSelected ? `${color}18` : "transparent",
        border: `1px solid ${isSelected ? color + "60" : "transparent"}`,
        borderRadius: 7,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.12s",
      }}
    >
      <span
        style={{
          fontSize: 9,
          padding: "2px 5px",
          borderRadius: 3,
          background: `${lc}22`,
          color: lc,
          border: `1px solid ${lc}44`,
          flexShrink: 0,
          letterSpacing: 0.5,
          fontWeight: 700,
        }}
      >
        {node.layer}
      </span>
      <span
        style={{
          fontSize: 12,
          color: isSelected ? "#eeeeff" : "#9999bb",
          flex: 1,
        }}
      >
        {node.label}
      </span>
      {isSelected && <span style={{ color: color, fontSize: 10 }}>▸</span>}
    </button>
  );
}

function NodePanel({ node, onClose }) {
  const layerColors = { L1: "#e94560", L2: "#0f9b8e", L3: "#f5a623" };
  const lc = layerColors[node.layer];

  // Find the cluster
  const cluster = CLUSTERS.find((c) => c.nodes.some((n) => n.id === node.id));

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 320,
        background: "#0d0d22",
        border: `1px solid ${lc}60`,
        borderRadius: 12,
        padding: 20,
        boxShadow: `0 8px 40px ${lc}20, 0 0 0 1px ${lc}20`,
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 10,
            padding: "3px 8px",
            borderRadius: 4,
            background: `${lc}22`,
            color: lc,
            border: `1px solid ${lc}44`,
            letterSpacing: 1,
            fontWeight: 700,
          }}
        >
          {node.layer} — {LAYER_LABELS[node.layer]}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#444466",
            cursor: "pointer",
            fontSize: 16,
            padding: 0,
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#eeeeff",
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        {node.label}
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#7777aa",
          lineHeight: 1.6,
          marginBottom: 14,
        }}
      >
        {node.desc}
      </div>

      {cluster && (
        <div
          style={{
            fontSize: 11,
            padding: "6px 10px",
            borderRadius: 6,
            background: `${cluster.color}12`,
            color: cluster.color + "cc",
            border: `1px solid ${cluster.color}30`,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>{cluster.icon}</span>
          <span>Cluster: {cluster.label}</span>
        </div>
      )}
    </div>
  );
}

function ListView({ clusters, selected, onSelectNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {clusters.map((cluster) => (
        <div key={cluster.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: `1px solid ${cluster.color}30`,
            }}
          >
            <span style={{ color: cluster.color, fontSize: 16 }}>
              {cluster.icon}
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#ddddff" }}>
              {cluster.label}
            </span>
            <span style={{ fontSize: 11, color: "#444466" }}>
              ({cluster.nodes.length})
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {cluster.nodes.map((node) => {
              const layerColors = {
                L1: "#e94560",
                L2: "#0f9b8e",
                L3: "#f5a623",
              };
              const lc = layerColors[node.layer];
              const isSelected = selected?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => onSelectNode(isSelected ? null : node)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 10px",
                    borderRadius: 20,
                    background: isSelected ? `${lc}22` : "#111128",
                    border: `1px solid ${isSelected ? lc + "80" : "#1e1e38"}`,
                    color: isSelected ? lc : "#8888aa",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.12s",
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      background: `${lc}22`,
                      color: lc,
                      padding: "1px 4px",
                      borderRadius: 3,
                      fontWeight: 700,
                    }}
                  >
                    {node.layer}
                  </span>
                  {node.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
