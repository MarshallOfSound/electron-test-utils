# Dialog Module

## Fetching the module

```js
import { utils } from 'electron-test-utils';
const { dialog } = utils;
```

## Usage

### OpenDialog

#### `dialog.nextOpenDialogCall(fileArray)`

* `fileArray` Array - An array of file paths, they do not have to be
valid paths

The next call to `showOpenDialog` will callback with the `fileArray`.

`K` Consecutive calls to `nextOpenDialogCall` will set the `fileArray` to be returned for the `ith` call to `showOpenDialog`.

#### `dialog.getOpenDialogCall(index)`

* `index` Number - The index of the `showOpenDialog` call to return

Returns the `index`th call to `showOpenDialog` as a [`call`](call.md)
object.  This allows you to test the correct args are passed in to
the method.

#### `dialog.getOpenDialogCalls()`

Returns an array of **all** the calls to `showOpenDialog` as [`call`](call.md) objects.

### SaveDialog

#### `dialog.nextSaveDialogCall(fileName)`

* `fileName` String - A path to save the file to.  The path does not have to be valid

The next call to `showSaveDialog` will callback with the `fileName`.

`K` Consecutive calls to `nextSaveDialogCall` will set the `fileName` to be returned for the `ith` call to `showSaveDialog`.

#### `dialog.getSaveDialogCall(index)`

* `index` Number - The index of the `showSaveDialog` call to return

Returns the `index`th call to `showSaveDialog` as a [`call`](call.md)
object.  This allows you to test the correct args are passed in to
the method.

#### `dialog.getSaveDialogCalls()`

Returns an array of **all** the calls to `showSaveDialog` as [`call`](call.md) objects.

### MessageBox

#### `dialog.nextMessageBoxCall(fileName)`

* `buttonIndex` Number - The button index of the MessageBox

The next call to `showMessageBox` will callback with the `buttonIndex`.

`K` Consecutive calls to `nextMessageBoxCall` will set the `buttonIndex` to be returned for the `ith` call to `showMessageBox`.

#### `dialog.getMessageBoxCall(index)`

* `index` Number - The index of the `showMessageBox` call to return

Returns the `index`th call to `showMessageBox` as a [`call`](call.md)
object.  This allows you to test the correct args are passed in to
the method.

#### `dialog.getMessageBoxCalls()`

Returns an array of **all** the calls to `showMessageBox` as [`call`](call.md) objects.

### ErrorBox

#### `dialog.getErrorBoxCall(index)`

* `index` Number - The index of the `showErrorBox` call to return

Returns the `index`th call to `showErrorBox` as a [`call`](call.md)
object.  This allows you to test the correct args are passed in to
the method.

#### `dialog.getErrorBoxCalls()`

Returns an array of **all** the calls to `showErrorBox` as [`call`](call.md) objects.
