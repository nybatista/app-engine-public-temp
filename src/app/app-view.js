import { ViewStream } from 'spyne';
import { UIHeaderView } from 'components/ui-elements/ui-header-view.js';
import { UIMenuDrawerView } from 'components/ui-elements/ui-menu-drawer-view.js';
import { StageView } from 'components/stage-view.js';
import { UIFooterView } from 'components/ui-elements/ui-footer-view.js';
import { LocalStorageNullView } from 'components/ui-elements/null-views/local-storage-null-view.js';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app';
    props.channels = ['CHANNEL_LOCAL_STORAGE', 'CHANNEL_APP_STATUS'];
    props.dataset = {};

    super(props);
  }

  addActionListeners() {
    return [
      [
        'CHANNEL_LOCAL_STORAGE_APP_SETTINGS_INITIALIZED_EVENT',
        'onLocalStorage',
      ],
      ['CHANNEL_APP_STATUS_SETTING_EVENT', 'onSettingsEvent'],
    ];
  }

  setTheme(theme = 'dark') {
    this.props.el.dataset.theme = theme;
  }

  onSettingsEvent(e) {
    const { settingsType } = e.payload;

    if (settingsType === 'theme') {
      const { theme } = this.props.el.dataset;
      this.props.el.dataset.theme = theme === 'dark' ? 'light' : 'dark';
    }
  }

  onLocalStorage(e) {
    const { theme } = e.payload;
    // this.props.el.dataset.theme='dark';
    this.setTheme(theme);
  }

  onRendered() {
    this.appendView(new UIHeaderView());
    this.appendView(new UIMenuDrawerView());
    this.appendView(new StageView());
    this.appendView(new UIFooterView());
    new LocalStorageNullView().appendToNull();
  }
}
