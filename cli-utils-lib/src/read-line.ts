import * as cp from 'copy-paste';
import * as rdl from 'readline'
import chalk from 'chalk';
import ansiEscapes from 'ansi-escapes';
import figures from 'figures';
import fs from 'node:fs'
export interface Key {
    code?: string
    ctrl?: boolean;
    meta?: boolean
    name: string
    shift?: boolean
    sequence?: string
}

export function keyIs(key: Key | null, tested: string | Key) {
    tested = typeof tested === "string" ? { name: tested } : tested;
    return (
        key != null
        && tested.name === key.name
        && (tested.code == null || key.code === tested.code)
        && (tested.ctrl == null || !!key.ctrl === tested.ctrl)
        && (tested.shift == null || !!key.shift === tested.shift)
        && (tested.meta == null || !!key.shift === tested.shift)
    )
}
export const readline = (function () {
    process.stdout.write('\x1b[?2004h');
    rdl.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    const overrides: Key[] = [];
    process.stdin.on('keypress', (str, key) => {
        currentRequest?.({ ...key });
        currentRequest = null;
        if (key.ctrl && key.name === 'c') {
            process.exit();
        }
    })
    let currentRequest: null | ((key: Key | null) => void) = null;
    function cancelRequest() {
        currentRequest?.(null);
        currentRequest = null;
    }
    async function keyIn(prompt?: string) {
        if (overrides.length !== 0) {
            return Promise.resolve(overrides.shift()!);
        }
        if (prompt) {
            console.log(prompt)
        }
        return new Promise<Key | null>(r => {
            currentRequest = r;
        });
    }
    function overrideNextKey(key: Key) {
        overrides.push();
    }
    return { cancelRequest, keyIn, overrideNextKey };
})();

type CommandDecoder<T> = (key: Key, options: SelectionOptions<T>, selection: number, next: CommandDecoder<T> | undefined) => 
    | { name: "return" | "escape" | "up" | "down" | "none" }
    | { name: "select", index: number }
    | { name: "skip", index: number }
    | undefined;
export interface SelectionOptions<T> {
    message: string,
    default?: number,
    choices: readonly T[],
    keyIn?: typeof readline.keyIn,
    commandDecoder?: CommandDecoder<T>,
    render: (options: SelectionOptions<T>, selection: number) => string
}
export const selectionCommandDecoder: CommandDecoder<any> = (key, options) => {
    if (key.name === 'return' || key.name === "f12") return { name: 'return' };
    if (key.name === 'escape') return { name: 'escape' };
    if (key.name == "up") return { name: 'up' };
    if (key.name == "down") return { name: 'down' };


    const selectedOption = options.choices.findIndex(c => c.shortcut && keyIs(key, c.shortcut));
    if(selectedOption !== -1) {
        return { name: "select", index: selectedOption };
    }

    const numericSelection = +key.name;
    if (!isNaN(numericSelection) && 0 <= numericSelection && numericSelection < options.choices.length) {
        process.stdout.write(`
Selected ${numericSelection}`);
        return { index: numericSelection, name: "select" };
    }
    return undefined;
}
export async function selection<T>(options: SelectionOptions<T>): Promise<null | {
    selection: T,
    key: Key,
    index: number
}> {
    let selected = options.default ?? 0;
    try {
        while (true) {
            const menu = options.render(options, selected);
            process.stdout.write(menu);
            const key = await (options.keyIn ?? readline.keyIn)();
            if (key === null) return null;


            const command = (options.commandDecoder ?? selectionCommandDecoder)(key, options, selected, selectionCommandDecoder);
            if (!command) continue;
            if (command.name === "skip") {
                selected = command.index;
            }
            if (command.name === "select") {
                return { selection: options.choices[command.index], key, index: command.index }
            }
            if (command.name === 'return') return {
                selection: options.choices[selected],
                key,
                index: selected
            };
            if (command.name === 'escape') return null;
            if (command.name === "up") {
                selected--;
                if (selected < 0) selected = options.choices.length - 1;
            }
            if (command.name === "down") {
                selected++;
                if (selected >= options.choices.length) selected = 0;
            }
            let lines = menu.split('\n');
            lines.forEach(() => {
                process.stdout.clearLine(0);
                process.stdout.write(ansiEscapes.cursorPrevLine);
            });
            process.stdout.write(ansiEscapes.cursorNextLine);
        }
    } finally {
        process.stdout.write('\n');
    }
}

export function menuRender<T extends MenuItem>(options: SelectionOptions<T>, selected: number) {
    const columns = Math.round(process.stdout.columns * 0.75);
    function renderChoice(c: MenuItem, index: number) {
        let message = index === selected ? figures.pointer + " " : "  ";
        message += index + ":" + c.name.substring(0, columns);
        return index === selected ? chalk.bold(chalk.blue(message)) : message;
    }
    return `${options.message}
${options.choices.map(renderChoice).join(`
`)}`
}
type MenuItem = { name: string, shortcut?: string }
interface MenuOptions<T> extends Omit<SelectionOptions<T>, 'render'> { }
export async function menu<T extends MenuItem>(options: MenuOptions<T>): Promise<T | null> {
    const sel = await selection({
        ...options,
        render: menuRender,
    });
    return sel ? sel.selection : null;
}


export async function yesNoPrompt(options: {
    message: string,
    default?: boolean,
    keyIn?: typeof readline.keyIn,
}): Promise<boolean | null> {
    process.stdout.write(`
${options.message} (${chalk.blue("Y")}/n)
`);
    while (true) {
        const key = await (options.keyIn ?? readline.keyIn)();
        if (key === null) return null;
        if (key.name === 'return' || key.name === 'y') return true;
        if (key.name === 'escape') return null;
        if (key.name === 'n') return false;
    }
}


export async function input(options: {
    message: string,
    value?: string,
    default?: boolean,
    keyIn?: typeof readline.keyIn,
}) {
    let result = options.value ?? "";
    let cursorLocation = result.length;
    await write(`
    ${options.message}: ${result}`);
    const keyIn = (options.keyIn ?? readline.keyIn);

    function jumpBack(span?: boolean) {
        if (span) {
            const indexOfSpace = result.lastIndexOf(' ', cursorLocation - 1);
            if (indexOfSpace !== -1) {
                return indexOfSpace - cursorLocation;
            } else {
                return -cursorLocation;
            }
        }
        return cursorLocation > 0 ? -1 : 0;
    }
    function jumpForward(span?: boolean) {
        if (span) {
            const indexOfSpace = result.indexOf(' ', cursorLocation + 1);
            if (indexOfSpace !== -1) {
                return indexOfSpace - cursorLocation;
            } else {
                return result.length - cursorLocation;
            }
        }
        return cursorLocation < result.length ? 1 : 0;
    }

    // async function getPos() {
    //     await write('\u001b[6n');
    //     const pos = await keyIn();
    //     return pos?.code?.substring(2);
    // }
    try {

        while (true) {
            const key = await keyIn();

            if (key === null) return null;

            const char =
                key.ctrl && key.name === 'v' ? cp.paste() :
                    (key.sequence?.length ?? 1) > 1 ? undefined :
                        key.shift ? key.sequence?.toUpperCase() :
                            key.sequence;

            if (key.name === 'return') {
                return result;
            }
            else if (key.name === 'escape') {
                return null;
            }
            else if (key.name === 'delete' || key.sequence === "\x1bd") {
                const jump = jumpForward(key.sequence === "\x1bd");
                await write(result.substring(cursorLocation + jump) + " ".repeat(jump));
                result = result.substring(0, cursorLocation) + result.substring(cursorLocation + jump);
                await moveCursor(cursorLocation - result.length - jump, 0);
                // await debug();
            }
            else if (key.name === 'backspace' || key.sequence === "\x17") {
                const jump = jumpBack(key.ctrl);
                await moveCursor(jump, 0);
                await write(result.substring(cursorLocation) + " ".repeat(-jump));
                result = result.substring(0, cursorLocation + jump) + result.substring(cursorLocation);
                await moveCursor(cursorLocation - result.length + 2 * jump, 0);
                cursorLocation += jump;
            }
            else if (key.name === 'left') {
                const jump = jumpBack(key.ctrl);
                cursorLocation += jump;
                await moveCursor(jump, 0);
            }
            else if (key.name === "home") {
                moveCursor(-cursorLocation, 0)
                cursorLocation = 0;
            }
            else if (key.name === "end") {
                moveCursor(result.length - cursorLocation, 0)
                cursorLocation = result.length;
            }
            else if (key.name === 'right') {
                const jump = jumpForward(key.ctrl);
                cursorLocation += jump;
                await moveCursor(jump, 0);
            }
            else if (char) {
                if (result.length === cursorLocation) {
                    result += char;
                    await write(char)
                    cursorLocation += char.length;
                    // await debug();
                } else {
                    result = result.substring(0, cursorLocation) + char + result.substring(cursorLocation);
                    await write(result.substring(cursorLocation));
                    await moveCursor(-(result.length - cursorLocation) + char.length, 0);
                    cursorLocation += char.length;
                    // await debug();
                }
            }
        }
    }
    finally {
        process.stdout.write(`\n`);
    }
}


function write(str: string) {
    return new Promise<void>(r => process.stdout.write(str, () => r()));
}
function moveCursor(dx: number, dy: number) {
    return new Promise<void>(r => process.stdout.moveCursor(dx, dy, r));
}
// export async function getPos() {
//     await write('\u001b[6n');
//     const pos = await keyIn();
//     return pos?.code?.substring(2);
// }


export async function inputRegex() {
    while (true) {
        const regexText = await input({
            message: "Regex"
        })
        if (regexText === null) return null;
        try {
            new RegExp(regexText);
            return regexText;
        } catch {
            console.log("Invalid regex");
            // if error just try again 
        }
    }
}