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
}
