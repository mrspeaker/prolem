# Programmable Lemmings

The game requires you to give instructions to small programmable characters🚶. The characters will that build things 🏫,dig 🔨 for resources 💎, farm 🌽, hunt 🍗, create towns/structures 🏤... like Minecraft meets Sim City.

Primary interface is the CLI 💻. You can do a bunch of stuff either with mouse or via code (selecting, assigning tasks) but should be more productive to use code and snippets. The gameplay is based on manipulating lists and jQuery-style selections. Characters will be grouped into sets that can filtered, combined, mapped, controlled etc.

        play area (parentheses indicate character's tags)
        |  _______________________________________________
        |  |                                   | tags    |
        |> |    🚶(*+)           🚶(+)        | > base  |
           |            🚶(*)             🌴  | > *     |  <- tagged groups and places
           |      🚶(+)              🏫       | > town  |     (right-click to select, or go etc)
           |                        🏫🏫      |         |
           |     🔨🚶(*)   🌴🌴        🚶(*) |---------|
           |-----------------------------------| snippets|
           | $> goto (20, 20)                  | > scr1  |  <- saved snippets/scripts
    cli -> | $> * take(5)                      | > scr2  |     (can exec on current selection, or reuse)
           |___________________________________|_________|


# Visual style

Visual style is like Aesprite: Very old school mouse and UI.

![Aseprite](http://aseprite.org/assets/images/gamedev.gif)

Play area gfx are minecraft-y/rougelike. It's "3d" (need to dig down, and build up) so either 3/4 view top-down, or maybe isometric, or full 3D. Perhaps something like this:

![minecraft-y/rougelike](https://cloud.githubusercontent.com/assets/129330/8313869/8a92774e-19b3-11e5-9d3f-87082c47d0b1.png)

# The language

The game requires its own programming language. It needs to be simple and easy to type - but very consistent. Probably lisp-ish. It's underpinned by a jquery-style selection model.

## Selections

Select via tags. Expressions that return a selection become the "current selection". If you don't specify a tag then it uses current select.

    $> +          // Select all + tags (equivelant jQuery would be $('.+'))
    $> * first    // first element in list of elements with * tag
    $> last       // last element in the current selection
    $> + tail     // all but head of +'s
    $> + drop(3)  // all but first 3 +'s
    $> take(2)    // first 2 of the current selection

Making selections will visibly select them in the play area - the selection can be augmented with ctrl-click/click-drag with mouse. The number of characters currently selected should always be visible. If you right-click in the play area there will be some commands you can run on the selection (even though most commands will come via the command line).

## Tagging

Characters can have 0 or more tags associated with them so they can be grouped.

    $> + removeFrom(+) addTo(*) // modify tags
    $> toggle(*)                // current selection items with * lose it, items without * gain it.

## Commands

The actions a group of tagged characters should perform. If there are multiple characters sent to complete a task, they will work together so it is faster.

    $> + head dig(10, 10, 1)                // digs a square 10 x 10 x 1
    $> + head goto(10, 10) build(5, 5, 20)  // go somewhere and start building
    $> + head go(10, 10)                    // go by relative amount
    $> + take(2) goto(10, 20) goto(base)    // go and come back

## where/if expressions?

    $> + where(health < 10) goto(base)
    $> + if(health < 10) goto(base) else goto(20, 20)

  - some expressions return values instead of selections? (only in where clauses?)
  - eg: distanceFrom(base)

## Functions

It would be much nicer to have variables and functions... but it might be harder to sculpt gameplay? Non-halting programs? Stack overflows? Hmm.. nah, functions would be good!

    $> func reTag(a, b) removeFrom(a) addTo(b) // really func?
    $> reTag(+, *)

  - Recursions and higher order functions

# Notes

- What's the goal? Are there enemies? Multi-player?
- tag areas with mouse, can refer in scripts (or some right-click options: like 'send selection here')
- code runs slowly as characters perform them, can see/cancel tasks
- expressions returning a selection becomes "current selection"
- how to deal with "conflicts"? eg a dig and build command overlap
- snippets/history folder with "run on current selection"
- would be cool to be turning complete, make logic gates etc.
  - Some kind of "eval"
  - conditionals?
- would be cool to include some cellular automata mechanics (that also might be turning complete ;)



