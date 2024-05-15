# Build

```sh
cd ./cli-utils-lib
npm install
npm run build


cd ../diff-validator
npm install
npm run build
```

# Run
In the typescript directory run:

```sh
node <path_to_repo>/diff-validator/dist/index.js <base-commit>
```

`base-commit` is optional. If ot specified local changes will be shown

# What it does

Shows the diffs for all type baseline file compared to a base commit. Options:

## Display

- Short Type Diff (s) - Collapses the diff lines for node reuse in a single line, where green <span style="color:green">^^^</span> means new node reuse, and red <span style="color:red">^^^</span> means less node reuse
- Hide trivial diff (t) - Only display diffs that are not new node reuse in the current file (use filtering to show only files with at least one non trivial diff )
- Show menu (m) - Show the menu a the bottom 

## Text navigation 

- Line Right (arrow right) - Move view window to see text to the right
- Line Left (arrow left) -  Move view window  to see text to the left
- Text Down (arrow down) - Move view window  to see text to the below
- Text Up (arrow up) - Move view window to see text to the above
- Line Home (home) - Go to start of line
- Line End (end) - Go to end of line
- Page Down (pagedown) - Move window to see a full screen of text below
- Page Up (pageup) - Move window to see a full screen of text above

## File navigation
- Next File (n) - View next file
- Prev File (p) - View previous file
- Jum to start (0) - Jump to first file
- View Next Diff (d) - Show the next screen of text that should be reviewed (either view txt to the right, view text below, or view next file)

## Notes
- Edit notes (e) - Edit notes for the current file
- View Notes (v) - View notes for the current file
- Filter (f) - Filter files by notes or file name 

# Git
- Revert files (r) - Revert local changes to teh current file
- Add files (a) - Stage current file