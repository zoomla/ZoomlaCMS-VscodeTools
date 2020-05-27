import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';

let webviewPanel : WebviewPanel | undefined;

export function createWebView(
    context: ExtensionContext,
    viewColumn: ViewColumn,
    label: string
) {
    if(webviewPanel === undefined) {
        webviewPanel = window.createWebviewPanel(
            'webView',
            label,
            viewColumn,
            {
                retainContextWhenHidden: true,
                enableScripts: true
            }
        );
        webviewPanel.webview.html = getIframeHtml(label);
    } else {
        webviewPanel.title = label;
        webviewPanel.webview.postMessage({label: label});
        webviewPanel.reveal();
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    webviewPanel.webview.onDidReceiveMessage(message => {
        switch(message.command) {
            case 'ifarmeLabel': 
                window.showInformationMessage(message.text);
        }
    });
    
    return webviewPanel;
}

export function getIframeHtml(label: string) {
    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>

        </head>

        <body>
            <iframe id='iframe1' class="iframeDiv" src="https://help.z01.com/vs-code/test.html?from=${label}" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}