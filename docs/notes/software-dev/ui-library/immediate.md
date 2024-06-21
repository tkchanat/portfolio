# Immediate Mode GUI
I am making my own ImGui library to learn a bit how the mainstream [Dear ImGui](https://github.com/ocornut/imgui) library actually works. The inner workings of Dear ImGui wasn't documented or explained anywhere else, so I might just do a shallow investigation into their code base and breifly talk about how it inspires my own implementation.

## Background
Immediate Mode GUI was initially suggested by Casey Muratori[^1] back in 2005. It's often being compared to the traditional retained mode GUI, e.g. Qt. ImGui on the other hand is declarative, using logical flow in the program to determine what to draw in a frame. This enables faster prototyping and writing throw-away code without any hassle. 

## 

## State Storage
Since immediate mode means everything are declarative, there will be no states recorded. So how are we suppose to have states shared across frames? The answer is of course, putting them in a storage that is managed by the context object. 

For example, an expandable element is clicked open on frame 1. Before we draw the expandable at frame 2, it needs to query the storage about the state of the expandable in order to determine whether to draw its expanded contents or not. But how to write the state of the expandable?

### Element ID
The state storage itself shouldn't be complicated. It can be just a hash map to a state struct. The problem is how to address immediate mode UI elements? They are not guaranteed to be consistent across frames. Meaning we cannot give each elements with an incremental counter.

Luckily, the element stack stays relatively stable across frames. By saying "stack", they are usually pushed with `begin_<name>` and poped with `end_<name>` (or manually by `push_id` and `pop_id`). This essentially wraps a "namespace" around the stack elements, such that duplicated names are allowed. For example:

```
• label1
> myExpandable
  • label2
v folder
  • label3
  > myExpandable
```

Here, the first `myExpandable` at root level has a hash value already. To prevent collision, the second level `myExpandable` will have its hash seeded by its parent `folder`'s hash. Now the name collision issue should be resolved. In case of inevitable collisions, Dear ImGui solves this by allowing custom IDs with `<name>###<customID>` to override the hashing input. 

And as a record, Dear ImGui chose [CRC32](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) as the hashing algorithm. Although there's a FIXME in the code saying using [FNV1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) can potentially speed up the hashing process as there's no need to do random access to a look up table, proper measurements are needed to conclude its effectiveness.

## My Version
As I said in the [Prelude](index.md#prelude) section, my goal is to write minimal code to support both retained and immediate mode UI elements. 
// TODO: Write more when I'm confident and consolidated the current architecture design.

[^1]: Casey Muratori (2005). Immediate-Mode Graphical User Interfaces. https://caseymuratori.com/blog_0001