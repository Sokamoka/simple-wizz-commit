# Simple Wizz Commits

Simple commit prompt for Wizz repo

## Install

```
npm install -g wcommit
```

## Useage

1. develop => 2. git add => 3. run wcommit

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

Clear all stored commit parameters:

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
