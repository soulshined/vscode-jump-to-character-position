# Change Log

All notable changes to the "go-to-character" extension will be documented in this file.

## v2.0

- Add support for the plugin to be used in a visual studio code editor running in the browser. For example, when pressing <kbd>.</kbd> on [github.dev](https://github.dev) while checking code, it will show a visual studio code editor and this extension is supported in those environments now
- Add support for [Workspace Trust](https://code.visualstudio.com/docs/editor/workspace-trust). The extension is fully supported in Restricted Mode as it does not need Workspace Trust to perform any functionality
- Adds a status bar item that will display the current cursor absolute index, depending on your zero-based index setting. This number is cast to a localized string, so it should be displayed in your respective language preference
    - It will display a go-to icon and the index, similar to how the native line/column numbers are displayed: `↷ 1,200º`

        ![statusbar demo](./images/statusbar%20demo.png)
    - There will be a superscript number `º` or `¹` on the right of the display to indicate your zero-based index setting at a glance
    - You can click on the status bar item for similar behavior as the line/column counter part
    - You can hide it by right clicking the item
    - You can control where in the statusbar the item is displayed via the `go-to-character-position.statusbar.priority` configuration setting

    Thanks to [@sahin52](https://github.com/soulshined/vscode-jump-to-character-position/issues/2) for suggesting this feature

## v1.0

- Initial release