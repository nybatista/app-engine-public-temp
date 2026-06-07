import { SpyneTrait } from 'spyne';
import { UIHeaderNavView } from 'components/ui-elements/ui-header-nav-view.js';
import { UIHeaderHamburgerView} from 'components/ui-elements/ui-header-hamburger-view.js';

export class UIHeaderViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'uiHeader$';

    super(context, traitPrefix);
  }

  static uiHeader$AddNavLinks(navLinks = []) {
    const data = navLinks.filter((o) => o.navLevel === 1);
    this.appendView(new UIHeaderNavView({ data }), '.header-content');
  }

  static uiHeader$OnAppDataEvent(logoTxt = '') {
    this.props.el$('.branding h1 span').el.innerHTML = logoTxt;
  }

  static uiHeader$UIHeaderViewOnAppInitEvent(e) {
    const { initData } = e.payload;
    const { navLinks, header } = initData;
    this.uiHeader$AddNavLinks(navLinks);
    this.uiHeader$OnAppDataEvent(header);
  }

  static uiHeader$UIHeaderViewOnRendered(e) {
    this.appendView(new UIHeaderHamburgerView());
  }



}
