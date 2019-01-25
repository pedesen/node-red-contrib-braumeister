# Node-RED Braumeister

Basic [Node-RED](https://nodered.org) for interacting with Speidels Braumeister homebrewing system

## braumeister node

![braumeister node](docs/node-braumeister.png)

This node does an HTTP request to the Braumeisters `/bm.txt` file.

Returns an object containing measurement data / status values.

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

Returns a list of recipe strings. These strings need to be "decrypted", contributions welcome ;)

## Contibutions

Contributions are always welcome! I need help further decrypting the `/rz.txt` and `/bm.txt` response files.
