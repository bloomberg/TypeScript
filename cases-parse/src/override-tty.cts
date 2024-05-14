const tty = require("tty") as typeof import("tty");
tty.isatty = () => {
    return true;
}