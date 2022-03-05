import * as vscode from "vscode";

let cachedInput : any = undefined;

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {

    console.log('"go-to-character-position" is active');

    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand('go-to-character-position.go-to-character-position', async function (editor) {
            const indexing = getEnumConfiguration('defaultIndex', 'zero based', ['zero based', 'one based']);

            const input = await vscode.window.showInputBox({
                ignoreFocusOut: true,
                prompt: `Your current index setting is ${indexing} and there are ${new Intl.NumberFormat().format(editor.document.getText().length)} characters in this text body`,
                title: "Jump to an absolute character index in the active editor",
                value: cachedInput === undefined ? '' : cachedInput,
                validateInput: (value) => {
                    if (!value.match(/^\d+$/m))
                        return "Invalid input. Please enter a valid positive whole number"

                    return null;
                }
            });

            if (input === undefined) return

            let index = clamp(+input, 0);
            cachedInput = index;

            if (indexing === 'one based') index = clamp(index - 1, 0)

            let target = editor.document.positionAt(index);
            target = editor.document.validatePosition(target);

            editor.revealRange(new vscode.Range(target, target), getRevealType());
            editor.selection = new vscode.Selection(target, target);
        })
    )
}

// this method is called when your extension is deactivated
export function deactivate() { }

function getRevealType() {
    const revealType = getEnumConfiguration('revealType', 'top', ['top', 'center', 'default', 'centerifoutsidetheviewport']);

    switch (revealType) {
        case 'default':
            return vscode.TextEditorRevealType.Default
        case 'center':
            return vscode.TextEditorRevealType.InCenter
        case 'centerifoutsidetheviewport':
            return vscode.TextEditorRevealType.InCenterIfOutsideViewport
        default:
            return vscode.TextEditorRevealType.AtTop
    }
}

function getEnumConfiguration(identifier: string, defaultConfig: string, possibles : string[] = []) {
    let enumType = vscode.workspace.getConfiguration('go-to-character-position').get(identifier) as string;
    enumType = possibles.includes(enumType.toLowerCase()) ? enumType.toLowerCase() : defaultConfig.toLowerCase();

    return enumType
}

function clamp(val: any, min: any, max = Infinity) {
    if (val < min) return min;
    if (val > max) return max;

    return val
}