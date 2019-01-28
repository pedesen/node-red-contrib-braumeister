# Node-RED Braumeister

Basic [Node-RED](https://nodered.org) nodes for interacting with Speidels Braumeister homebrewing system. When a BRAUMEISTERmobil WiFi module is installed, it is running a web server with a rudimentary API. It provides measurement data like temperature or pump status as well as a list of stored recipes.

## Requirements

* Braumeister brewing equipment
* BRAUMEISTERmobil WiFi extension module
* Node-RED

## braumeister node

![braumeister node](docs/node-braumeister.png)

This node does an HTTP request to the Braumeisters `/bm.txt` file. The response is a txt file containing a csv-like string:

```
"V1.1.27 Sep 12 2018;0004A30B003FA809;0X13:13XCX2930X0X 72.5X0X2234X1X1X5X0X191XA00SXpiX000X0X0X0"
```

(See [/bm.txt](docs/bm.txt.md) for more details what these values stand for.)

This node converts this string into an object containing measurement data / status values.

| value                 | description                                     |
| --------------------- | ----------------------------------------------- |
| `firmware_version`    | Braumeister firmware version                    |
| `temperature_current` | current temperature in °C                       |
| `temperature_target`  | target temperature in °C                        |
| `time_target`         | target time in seconds                          |
| `time_elapsed`        | elapsed time in seconds                         |
| `pump`                | pump status: `"off"`, `"on"` or `"inactive"`    |
| `heating`             | heating status: `"off"`, `"on"` or `"inactive"` |
| `source_string`       | raw source string                               |

#### Example Usage

![example](docs/example.png)

## recipes node

![recipes node](docs/node-recipes.png)

This node does an HTTP request to the Braumeisters `/rz.txt` file.

So far this returns a list of recipe strings, which look like this:

```
[
  "0X40X65X90X78X15X78X0X78X0X78X0X15X100X15X0X0",
  "1X38X63X0X63X40X72X20X78X15X78X0X80X100X70X40X5",
  "2X38X52X5X63X5X72X5X78X5X78X0X80X100X60X30X2",
  "3X40X52X15X63X90X72X15X78X20X78X0X60X102X55X40X1"
]
```

These strings need to be further "decrypted", contributions welcome ;)

## Contributions

Contributions are always welcome! I need help further decrypting the `/rz.txt` and [/bm.txt](`docs/bm.txt.md`) response files.
