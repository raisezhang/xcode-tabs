'use babel';

import XcodeTabsView from './xcode-tabs-view';
import { CompositeDisposable } from 'atom';

export default {

  xcodeTabsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.xcodeTabsView = new XcodeTabsView(state.xcodeTabsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.xcodeTabsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'xcode-tabs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.xcodeTabsView.destroy();
  },

  serialize() {
    return {
      xcodeTabsViewState: this.xcodeTabsView.serialize()
    };
  },

  toggle() {
    console.log('XcodeTabs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
