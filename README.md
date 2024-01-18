# Simple Wizz Commits

**Simple commit prompt for Wizz repo**

Just work on the task, add the changes and you're ready to commit.
Push it if you want! The `wcommit` also handles the "--set-upstream" push.
The `wcommit` stores the data previously entered, so you don't have to re-enter it every time. If for some reason you don't want a commit to overwrite a previous state or you don't want to use the previous state, use the `--no-store` option.

## Install

```
npm install -g wcommit
```

## Useage

1. develop => 2. git add => 3. run wcommit => 4. push (if you want)

```
wcommit
```

or

```
npx wcommit
```

## Options

| Option          | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| -v, --version   | Get current version                                                      |
| -h, --help      | Get options                                                              |
| -c, --clear     | Clear all stored commit parameters                                       |
| -a, --clear-all | Clear all stored data                                                    |
| --no-store      | Saved commit parameters are not loaded and new parameters are not saved. |

### Examples

Clear all stored commit parameters from actual branch:

```
wcommit -c
```

Saved commit parameters are not loaded and new parameters are not saved:

```
wcommit --no-store
```

## Store

Location:

```
# MacOs:
'/Users/<user>/Library/Preferences/wcommit-nodejs/config.json'
```
