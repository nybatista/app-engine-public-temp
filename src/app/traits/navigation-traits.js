import { SpyneTrait } from 'spyne';
import { UIHeaderNavView } from 'components/ui-elements/ui-header-nav-view.js';

export class NavigationTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'nav$';

    super(context, traitPrefix);
  }

  static nav$AddNavLinks(navLinks = []) {
    const data = navLinks.filter((o) => o.navLevel === 1);
    this.appendView(new UIHeaderNavView({ data }), '.header-content');
  }

  static nav$OnAppDataEvent(logoTxt = '') {
    this.props.el$('.branding h1 span').el.innerHTML = logoTxt;
  }

  static nav$OnAppInitEvent(e) {
    const { initData } = e.payload;
    const { navLinks, header } = initData;
    this.nav$AddNavLinks(navLinks);
    this.nav$OnAppDataEvent(header);
  }

  static nav$UIHeaderNavViewUpdateSettingsBtn(type, value) {
    this.props.el$(`[data-settings-type="${type}"]`).el.dataset.settingsValue =
      value;
  }


  static nav$UIHeaderNavViewOnSettingsInit(e) {
    const { theme } = e.payload;
    this.nav$UIHeaderNavViewUpdateSettingsBtn('theme', theme);
  }

  static nav$UIHeaderNavViewOnSettingsEvent(e) {
    const { settingsType, settingsValue } = e.payload;
    this.nav$UIHeaderNavViewUpdateSettingsBtn(settingsType, settingsValue);
  }

  static nav$UIHeaderNavViewOnRouteChangeEvent(e) {
    const { pageId } = e.payload;
    const activeSel = `a.nav[data-page-id='${pageId}']`;
    this.props.el$('a.nav').setActiveItem('selected', activeSel);


  }
}
