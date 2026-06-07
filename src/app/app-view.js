import { ViewStream } from 'spyne';
import { UIHeaderView } from 'components/ui-elements/ui-header-view.js';
import { UIMenuDrawerView } from 'components/ui-elements/ui-menu-drawer-view.js';
import { StageView } from 'components/stage-view.js';
import { UIFooterView } from 'components/ui-elements/ui-footer-view.js';
import { LocalStorageNullView } from 'components/ui-elements/null-views/local-storage-null-view.js';
import { AppViewTraits } from 'traits/app-view-traits.js';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app';
    props.channels = ['CHANNEL_LOCAL_STORAGE', 'CHANNEL_APP'];
    props.traits = [AppViewTraits];
    props.dataset = {};

    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_LOCAL_STORAGE_APP_SETTINGS_INITIALIZED_EVENT',  'appSetup$OnLocalStorageEvent'],
      ['CHANNEL_APP_SETTING_EVENT', 'appSetup$OnSettingsEvent'],
    ];
  }

  onRendered() {
    this.appendView(new UIHeaderView());
    this.appendView(new UIMenuDrawerView());
    this.appendView(new StageView());
    this.appendView(new UIFooterView());
    new LocalStorageNullView().appendToNull();
  }
}
