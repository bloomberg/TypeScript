import * as fs from 'fs'
import chalk from "chalk";
import figures from "figures";
import { input, selection, menuRender, menu, readline, yesNoPrompt, inputRegex } from "./read-line.js";

type DefaultFilter = {
    negate?: boolean;
} & ({
    type: "none",
} | {
    type: "name",
    regex: string,
} | {
    type: "column-value-missing",
    column: string,
} | {
    type: "column-value-any",
    column: string,
} | {
    type: "column-value-regex",
    column: string,
    regex: string,
} | {
    type: "column-value",
    column: string,
    value: string,
});

type Notes<TFilters extends { type: string, negate: boolean }> = {
    columns: string[],
    lastIndex: number,
    filters: (DefaultFilter | TFilters)[],
    savedFilters: Record<string, (DefaultFilter | TFilters)[]>
    records: Record<string, Record<string, undefined | string | string[]>>
}
export function makeNoteService<T, TFilters extends { type: string, negate: boolean }>(opts: {
    notesFile: string;
    key: (test: T) => string,
    getFilter: (filter: TFilters) => (test: T) => boolean;
    displayFilter: (filter: TFilters) => string;
    getRecords: () => T[];
    getVisibleRecords: () => T[];
    onFiltersUpdated: (f: (TFilters | DefaultFilter)[]) => Promise<void>;
    onNotesChanged: (notes: Notes<TFilters>) => Promise<void>
    getFilterOptions: () => Array<{ customType: TFilters['type'], name: string }>,
    makeFilter: (type: TFilters['type'], negate: boolean) => Promise<TFilters | undefined>
}) {
    let notes: Notes<TFilters> = loadNotes();
    type Filter = TFilters | DefaultFilter;

    function saveNotes() {
        fs.writeFileSync(opts.notesFile, JSON.stringify(notes, undefined, 2), { encoding: "utf-8" });
    }
    function loadNotes() {
        const value = fs.existsSync(opts.notesFile) ? JSON.parse(fs.readFileSync(opts.notesFile, { encoding: "utf-8" })) as never : {
            columns: ["categories", "notes"],
            lastIndex: 0,
            filters: [],
            savedFilters: {},
            records: {},
        }
        value.lastIndex ??= 0;
        value.records ??= {}
        value.savedFilters ??= {}
        value.filters ??= [];
        value.columns = ["categories", "notes"]
        return value;
    }
    async function updateGlobalTestFilter(filter?: Filter) {
        notes.filters ??= [];
        if (filter) {
            notes.filters.push(filter);
        }
        await opts.onFiltersUpdated(notes.filters);
    };

    function type<T>(o: any): asserts o is T { }
    function assertType<T>(o: T) { }

    function getCount(filter: Filter) {
        return applyFilters(opts.getVisibleRecords(), [...notes.filters, filter]).length
    }
    function applyFilters(record: T[], filters: Filter[]) {
        const filterFns = filters.map(getFilterFunction);
        return record.filter(t => filterFns.every(fn => fn(t)));
    }
    function displayFilter(filter: Filter) {
        return filter.negate ? `!(${displayFilterWorker(filter)})` : displayFilterWorker(filter);
        function displayFilterWorker(filter: Filter) {
            type<DefaultFilter>(filter);
            switch (filter.type) {
                case "none": return "--none--";
                case "name": return `name like ${filter.regex}`;
                case "column-value-any": return `any ${filter.column}`;
                case "column-value-missing": return `missing ${filter.column}`;
                case "column-value-regex": return `${filter.column} like ${filter.regex}`;
                case "column-value": return `${filter.column} === ${filter.value}`;
                default:
                    assertType<never>(filter);
                    return opts.displayFilter(filter);
            }
        }
    }
    function getCurrentFilterDisplay() {
        return notes.filters?.map(f => `(${displayFilter(f)})`).join(" AND ") ?? ""
    }
    function getFilterFunction(filter: Filter): (test: T) => boolean {
        function withKey(fn: (t: string) => boolean) {
            return (t: T) => fn(opts.key(t));
        }
        function withKeyAndValue(column: string, fn: (v: string | undefined) => boolean,) {
            return withKey((test) => {
                const value = notes.records[test]?.[column];
                return !value || typeof value === "string" ? fn(value) :
                    value.length === 0 ? fn(undefined) : value.some(fn);
            });
        }
        const filterFn = getFilterFunctionWorker(filter);
        return filter.negate ? (t) => !filterFn(t) : filterFn;
        function getFilterFunctionWorker(filter: Filter): (test: T) => boolean {
            type<DefaultFilter>(filter);
            switch (filter.type) {
                case "none":
                    return () => true;
                case "name": {
                    const regex = new RegExp(filter.regex);
                    return withKey((test) => regex.test(test))
                }
                case "column-value-missing": {
                    return withKeyAndValue(filter.column, (value) => !value);
                }
                case "column-value-any": {
                    return withKeyAndValue(filter.column, (value) => !!value);
                }
                case "column-value-regex": {
                    const regex = new RegExp(filter.regex);
                    return withKeyAndValue(filter.column, (value) => !!value && regex.test(value));
                }
                case "column-value": {
                    return withKeyAndValue(filter.column, (value) => filter.value === value);
                }
                default:
                    assertType<never>(filter);
                    return opts.getFilter(filter as TFilters)
            }
        }
    }
    function getAllNotesForTest(test: T) {
        const testKey = opts.key(test);
        const notesForTest = notes.records[testKey];
        if (!notesForTest) return []
        return notes.columns
            .map(column => {
                let value = notesForTest[column];
                return {
                    name: column,
                    value: typeof value === "string" ? [value] : value ?? []
                };
            });
    }
    function setNoteValue(test: T, column: string, value: string | undefined) {
        const testKey = opts.key(test);
        return setNoteValueByKey(testKey, column, value);
    }
    function setNoteValueByKey(testKey: string, column: string, value: string | undefined) {
        
        const notesForTest = (notes.records[testKey] ??= {})
        if (value) {
            notesForTest[column] = value;
        }
        else {
            delete notesForTest[column];
            if (Object.keys(notes.records[testKey]).length === 0) {
                delete notes.records[testKey];
            }
        }
    }
    function getAllColumnValues(column: string) {
        const recordsWithCount = Object.values(notes.records).flatMap(n => n[column]!).filter(Boolean).reduce((acc, e) => {
            acc[e] = (acc[e]?? 0) + 1;
            return acc
        }, {} as Record<string, number>)
        return Object.entries(recordsWithCount).sort(([, a], [, b]) => b - a).map(([n]) => n);
    }

    async function filterMenu() {
        const filterKindSelection = await selection({
            message: "Select column (hold shift for negation)",
            render: menuRender,
            choices: [
                { name: `List tests`, type: "list" as const, },
                { name: `Remove filter`, type: "remove" as const, },
                { name: `Negate filter`, type: "negate" as const, },
                { name: `Re-apply filter`, type: "apply" as const, },
                { name: `Save filter`, type: "save" as const, },
                { name: `Load filter`, type: "load" as const, },
                { name: `Delete filter`, type: "delete" as const, },
                { name: `Test name`, type: "name" as const, },
                ...notes.columns.map(column => ({ name: `By ${column}`, type: "column" as const, column })),
                ...opts.getFilterOptions().map(c => ({ type: "custom" as const, ...c}))
            ]
        });
        if (!filterKindSelection) return;

        const filterKind = filterKindSelection.selection;
        if (filterKind.type === "save") {
            const overrideExisting = await menu({
                message: "Override existing or create new:",
                choices: [
                    { name: "--New--", type: "new" as const },
                    ...Object.keys(notes.savedFilters).map(name => ({ name, type: "existing" as const }))
                ]
            })
            if (overrideExisting === null) return;
            const filterName = overrideExisting.type === "existing" ? overrideExisting.name : await input({ message: "Filter Name" });
            if (filterName === null) return;
            notes.savedFilters[filterName] = [...notes.filters];
            notes.filters = [];
            await updateGlobalTestFilter();
            return true;
        }
        if (filterKind.type === "load") {
            const existingFilter = await menu({
                message: "Load filter:",
                choices: [
                    ...Object.keys(notes.savedFilters).map(name => ({ name, type: "existing" as const }))
                ]
            })
            if (existingFilter === null) return;
            notes.filters = [...notes.savedFilters[existingFilter.name]];
            await updateGlobalTestFilter();
            return true;
        }
        if (filterKind.type === "delete") {
            const existingFilter = await menu({
                message: "Delete filter:",
                choices: [
                    ...Object.keys(notes.savedFilters).map(name => ({ name, type: "existing" as const }))
                ]
            })
            if (existingFilter === null) return;
            delete notes.savedFilters[existingFilter.name];
            return true;
        }
        if (filterKind.type === "list") {
            let offset = 0;
            const selectedTest = await selection({
                commandDecoder(key, options, selection, next) {
                    const rows = Math.round(process.stdout.rows) - 5;
                    const page = Math.trunc(offset / rows);
                    if (key.name === "pagedown") {
                        const allPages = Math.ceil(options.choices.length / rows) - 1;
                        if (page < allPages) {
                            offset += rows;
                            return { name: "skip", index: Math.min(options.choices.length - 1, selection + rows) }
                        }
                    }
                    if (key.name === 'pageup') {
                        if (page > 0) {
                            offset -= rows;
                            return { name: "skip", index: Math.max(0, selection - rows) }
                        }
                    }
                    const cmd = next?.(key, options, selection, next);
                    if (!cmd) return undefined;

                    if (cmd.name === "skip" || cmd.name === "select") {
                        return { name: cmd.name, index: cmd.index + offset };
                    }
                    if (cmd.name === "up") {
                        const window = Math.min(1, Math.ceil(rows * .25))
                        if (offset + 2 > selection - window) {
                            offset = Math.max(0, selection - window - 2);
                        }
                        if (selection === 0) {
                            offset = options.choices.length - rows;
                        }
                    }
                    if (cmd.name === "down") {
                        const window = Math.min(1, Math.ceil(rows * .25))
                        if (offset + rows - 1 <= selection + window) {
                            offset = Math.min(options.choices.length - rows, selection + window - rows + 2);
                        }
                        if (selection === options.choices.length - 1) {
                            offset = 0;
                        }
                    }
                    return cmd;
                },
                render(options, selected) {
                    const columns = Math.round(process.stdout.columns * 0.75);
                    const rows = Math.round(process.stdout.rows) - 5;
                    const allPages = Math.ceil(options.choices.length / rows) - 1;
                    const page = Math.trunc(offset / rows);
                    return `${options.message}\n${options.choices.slice(offset, offset + rows)
                        .map((t, index) => {
                            const isSelected = (offset + index) === selected;
                            const notes = getAllNotesForTest(t.test);
                            if (!isSelected) {
                                notes.splice(1, notes.length - 1);
                            }
                            let message = isSelected ? figures.pointer + " " : "  ";
                            message += index + ":" + opts.key(t.test);
                            message += " " + notes.filter(n => n.value.length).map(n => `${n.name}: ${n.value.join(",")}`).join("\n     ");
                            message = message.substring(0, columns);
                            return isSelected ? chalk.bold(chalk.blue(message)) : message;
                        }).join(`\n`)}\n` +
                        ` Page ${page} of ${allPages}`
                },
                message: "Select Test:",
                choices: opts.getVisibleRecords().map((test, index) => ({
                    test,
                    index,
                    shortcut: undefined,
                })),
            });
            if (!selectedTest) return;
            jumpTo(selectedTest.index);
            return true;
        }
        if (filterKind.type === "apply") {
            await updateGlobalTestFilter();
            return true;
        }
        if (filterKind.type === "negate") {
            jumpTo(0);
            const toRemove = await menu({
                message: "Negate filter:",
                choices: [
                    ...(notes.filters ?? []).map((f, i) => ({
                        name: displayFilter(f),
                        index: i
                    }))
                ]
            })
            if (toRemove === null) return;
            notes.filters[toRemove.index].negate = !notes.filters[toRemove.index].negate;
            await updateGlobalTestFilter();
            return true;
        }
        if (filterKind.type === "remove") {
            jumpTo(0);
            const toRemove = await menu({
                message: "Remove filter:",
                choices: [
                    { name: "All", type: "all" as const },
                    ...(notes.filters ?? []).map((f, i) => ({
                        name: displayFilter(f),
                        type: "filter" as const,
                        index: i
                    }))
                ]
            })
            if (toRemove === null) return;
            if (toRemove.type === "all") {
                if (notes.filters) {
                    notes.filters.length = 0
                }
            }
            else {
                notes.filters?.splice(toRemove.index, 1);
            }
            await updateGlobalTestFilter();
            return true;
        }

        const negate = filterKindSelection.key.name === "f12";

        if (filterKind.type === "name") {
            const regex = await inputRegex();
            if (!regex) return;
            await updateGlobalTestFilter({ type: "name", regex, negate });
            return true;
        }
        if(filterKind.type === "custom") {
            await updateGlobalTestFilter(await opts.makeFilter(filterKind.customType, negate));
            return true;
        }
        const column = filterKind.column;
        const knownValues = getAllColumnValues(column).map(v => ({
            name: `${column} with value ${v} (${getCount({ type: "column-value", column, value: v })})`,
            type: "value" as const,
            text: v
        }))
        const filterSelection = await menu({
            message: "Select value:",
            choices: [
                { name: "By regex", type: "regex" as const },
                { name: `Missing value (${getCount({ type: "column-value-missing", column })})`, type: "empty" as const },
                { name: `Any value (${getCount({ type: "column-value-any", column })})`, type: "any" as const },
                ...knownValues,
            ]
        });
        if (!filterSelection) return;
        if (filterSelection.type === "any") {
            await updateGlobalTestFilter({ type: "column-value-any", column, negate });
        }
        else if (filterSelection.type === "empty") {
            await updateGlobalTestFilter({ type: "column-value-missing", column, negate });
        }
        else if (filterSelection.type === "regex") {
            const regex = await inputRegex();
            if (!regex) return;
            await updateGlobalTestFilter({ type: "column-value-regex", regex, column, negate });
        } else {
            await updateGlobalTestFilter({ type: "column-value", column, value: filterSelection.text, negate });
        }
        return true;
    }


    async function viewNotes() {
        const existingNote = notes.records[opts.key(getCurrent())];
        if (!existingNote) {
            process.stdout.write(`No notes
`);
        }
        for (const key of Object.keys(existingNote)) {
            if (!existingNote[key]) continue;
            console.log(`${key}: ${[existingNote[key]].flat().join(", ")}`);
        }
        await readline.keyIn("Press any key");
    }
    async function editNotes() {
        const testKey = opts.key(getCurrent());
        let columnSelection = await menu({
            message: "Select column",
            choices: [
                ...notes.columns.map(v => ({ name: v, type: "value" as const, value: v })),
                { name: "Add column", type: "add" as const },
                { name: "Delete notes", type: "delete" as const },
            ]
        });
        if (columnSelection == null) return;
        let column;
        if (columnSelection.type === "add") {
            column = await input({
                message: "New Column Name"
            });
            if (!column) return;
            notes.columns.push(column);
        }
        else if (columnSelection.type === "delete") {
            const confirm = await yesNoPrompt({
                message: "Are you sure you want to delete notes for the test?"
            })
            if (!confirm) return;
            delete notes.records[testKey];
            await opts.onNotesChanged(notes);
            return;
        }
        else {
            column = columnSelection.value;
        }

        const existingValues = getAllColumnValues(column);
        const existingNote = notes.records[testKey] ??= {};
        const existingValue = existingNote[column]
        const existingValueSelection = existingValues.length === 0 ? undefined : await selection({
            render: menuRender,
            message: "Select existing value:",
            commandDecoder(key, options, selected, next) {
                if (key.name === "f12") return { name: "return" };
                return next?.(key, options, selected, next);
            },
            choices: [
                ...existingValues.map(value => ({ name: value, type: "value" as const, text: value, shortcut: undefined })),
                { name: "-- New Text ---", type: "text" as const, shortcut: undefined },
                { name: "-- Remove Value ---", type: "remove" as const, shortcut: undefined },
            ],
        });
        if (existingValueSelection === null) return;
        let newValue = null;
        let isAdd = false;
        if (existingValueSelection) {
            isAdd = Array.isArray(existingValue) || existingValueSelection.key.name === "f12";
            if (existingValueSelection.selection.type === "remove") {
                if (!existingValue || typeof existingValue === "string") {
                    delete existingNote[column];
                    return
                }
                const toRemove = await menu({
                    message: "Remove item:",
                    choices: existingValue.map((name, index) => ({
                        name,
                        index
                    }))
                });
                if (toRemove === null) return;
                existingValue.splice(toRemove.index, 1);
                return;
            }

        }
        if (existingValueSelection?.selection.type === "value") {
            newValue = existingValueSelection.selection.text;
        }
        else {
            newValue = await input({
                message: `${isAdd ? "Add to" : "Edit"} ${column}`,
                value: existingValue === "string" ? existingValue : "",
            });
        }

        if (newValue === null) return;
        if (!isAdd) {
            existingNote[column] = newValue;
        } else {
            const value =
                !existingValue ? [] :
                    typeof existingValue === "string" ? [existingValue] :
                        existingValue;
            existingNote[column] = value;
            value.push(newValue);
        }
        await opts.onNotesChanged(notes);
    }
    function jumpTo(index: number) { notes.lastIndex = index }
    function jumpToOffset(offset: number) {
        const newIndex = notes.lastIndex + offset
        if (newIndex < 0) {
            notes.lastIndex = 0
        }
        else {
            const visible = opts.getVisibleRecords();
            if (newIndex < visible.length) {
                notes.lastIndex = newIndex;
            } else {
                notes.lastIndex = visible.length - 1;
            }
        }

    }
    function getCurrent () { return opts.getVisibleRecords()[notes.lastIndex ?? 0] }
    return {
        notesMenu: filterMenu,
        applyFilters,
        editNotes,
        viewNotes,
        getCurrentFilterDisplay,
        setNoteValue,
        setNoteValueByKey,
        getDefaultColumnContent(test = getCurrent()) {
            const defaultColumn = notes.columns[0];
            const noteForTest = notes.records[opts.key(test)] ?? {};
            return `${chalk.bold(defaultColumn)}: ${noteForTest[defaultColumn]}`;
        },
        saveNotes,
        getNotes: () => notes,
        reloadNotes: () => notes = loadNotes(),
        jumpTo,
        jumpToOffset,
        getCurrent,
        findRecord(key: string) {
            return opts.getRecords().find(t => opts.key(t) === key);
        },
        getCount,
    }
}
