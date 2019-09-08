# bm.txt

/bm.txt contains a text string containing all available status information. It looks like this:

```js
"V1.1.27 Sep 12 2018;0004A30B003FA809;0X13:13XCX2930X0X 72.5X0X2234X1X1X5X0X191XA00SXpiX000X0X0X0";
```

When splitting the whole string by `;` we get:

```js
0: "V1.1.27 Sep 12 2018"  // firmware_version
1: "0004A30B003FA809"
2: "0X13:13XCX2930X0X 72.5X0X2234X1X1X5X0X191XA00SXpiX000X0X0X0"
```

When splitting `[2]` by `"X"` we get:

```js
0: "0"      // language
1: "13:13"  // time
2: "C"      // temperature unit
3: "2930"   // status code
4: "0"      // target temperature (in °C) but * 10
5: " 72.5"  // current temperature (in °C)
6: "0"      // target time (in s)
7: "2234"   // time elapsed (in s)
8: "1"
9: "1"      // recipe
10: "5"     // # rast
11: "0"     // # hop
12: "191"   // progress (318 = 100%)
13: "A00S"  // buttons
14: "pi"    // [0]: pump { p: 'off', P: 'on', q: 'inactive' }
            // [1]: heating { h: 'off', H: 'on', i: 'inactive' }
15: "000"   // interrupt [0] = 0/1
            //           [1] = 'D' -> cover / beep else beep
            //           [2] = edit-mode
16: "0"
17: "0"
18: "0"     // min to next hop
```

## Contributions welcome!

If you've' figured out what the other values stand for, feel free to add a comment to the list above and create a PR. If you want to be super cool, also add it to [braumeister.js](/nodes/braumeister.js) :)
