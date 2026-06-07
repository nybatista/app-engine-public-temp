import { SpyneTrait } from 'spyne';
import { UIHeaderView } from 'components/ui-elements/ui-header-view.js';
import {
  UIMenuDrawerView
} from 'components/ui-elements/ui-menu-drawer-view.js';
import { StageView } from 'components/stage-view.js';
import { UIFooterView } from 'components/ui-elements/ui-footer-view.js';
import {
  LocalStorageNullView
} from 'components/ui-elements/null-views/local-storage-null-view.js';

export class AppViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'appSetup$';
    super(context, traitPrefix);
  }

  static appSetup$SetTheme(theme = 'dark', props = this.props) {
    props.el.dataset.theme = theme;
  }

  static appSetup$OnLocalStorageEvent(e){
    const { theme } = e.payload;
    this.appSetup$SetTheme(theme);
  }

  static appSetup$OnSettingsEvent(e){
    const { settingsType } = e.payload;

    if (settingsType === 'theme') {
      const { theme } = this.props.el.dataset;
      this.props.el.dataset.theme = theme === 'dark' ? 'light' : 'dark';
    }
  }

  static appSetup$OnAppViewRendered(){
    this.appendView(new UIHeaderView());
    this.appendView(new UIMenuDrawerView());
    this.appendView(new StageView());
    this.appendView(new UIFooterView());
    new LocalStorageNullView().appendToNull();
  }
}
