import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window } from 'vscode';
import { join } from 'path';

const ITEM_ICON_MAP = new Map<string, string>([
    ['pig1', 'pig1.png'],
    ['pig2', 'pig2.png'],
    ['pig3', 'pig1.png'],
    ['pig4', 'pig2.png'],
    ['pig5', 'pig1.png'],
    ['pig6', 'pig2.png'],
    ['pig7', 'pig1.png'],
    ['pig8', 'pig2.png'],
    ['pig9', 'pig1.png']
]);

export class TreeItemNode extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
    ){
        super(label, collapsibleState);
    }

    command = {
        title: this.label,
        command: 'itemClick',
        tooltip: this.label,
        arguments: [
            this.label,
        ]
    };

    iconPath = TreeItemNode.getIconUriForLabel(this.label);

    static getIconUriForLabel(label: string):Uri {
        return Uri.file(join(__filename,'..', '..' ,'src' ,'assert', ITEM_ICON_MAP.get(label)+''));
    }

}


export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
    onDidChangeTreeData?: import("vscode").Event<TreeItemNode | null | undefined> | undefined;    
    
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: TreeItemNode | undefined): import("vscode").ProviderResult<TreeItemNode[]> {
        return [ '在线帮助1','在线帮助2','在线帮助3','在线帮助4','在线帮助5','在线帮助6','在线帮助7','在线帮助8','在线帮助9' ].map(
            item => new TreeItemNode(
                item as string,
                TreeItemCollapsibleState.None as TreeItemCollapsibleState,
        ));
    }

    public static initTreeViewItem(){
        const treeViewProvider = new TreeViewProvider();
        window.registerTreeDataProvider('treeView-item',treeViewProvider);
    }
}








