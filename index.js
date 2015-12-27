var fs = require("fs");
var Sealious = require("sealious");

Sealious.init();

new Sealious.ChipTypes.ResourceType({
name: "person",
fields: [
{name: "name", type: "text", required: true},
{name: "age", type: "int", required: true}
]});

Sealious.ConfigManager.set_config(
    "chip.channel.www_server", {
        connection: {
            tls: {
                key: fs.readFileSync("sealious.key"),
                cert: fs.readFileSync("sealious.crt")
            }
        }
    }
);

Sealious.start();

