// @ts-nocheck

figma.showUI(__html__, {
    width: 300,
    height: 900,
});

figma.on('selectionchange', () => {
    figma.ui.postMessage({
        type: 'selection-change',
        payload: onSelectChange(),
    });
});

function onSelectChange() {
    if (figma.currentPage.selection.length !== 1) {
        return {type: 'selected-change', status: 'error', payload: {message: 'Select a single node.'}};
    }

    const node = figma.currentPage.selection[0];
    if (node.type !== 'TEXT') {
        return {type: 'selected-change', status: 'error', payload: {message: 'Select a single text node.'}};
    }

    return {type: 'selected-change', status: 'success', payload: {content: node.characters, fontSize: node.fontSize}};
}