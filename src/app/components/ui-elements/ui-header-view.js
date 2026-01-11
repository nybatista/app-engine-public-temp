import { ViewStream } from 'spyne';
import { NavigationTraits } from 'traits/navigation-traits.js';
import UIHeaderTmpl from './templates/ui-header-view.tmpl.html';
import { UIHeaderHamburgerView } from 'components/ui-elements/ui-header-hamburger-view.js';

export class UIHeaderView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'header';
    props.id = 'site-header';
    props.traits = [NavigationTraits];
    props.channels = ['CHANNEL_APP_STATUS'];
    props.template = UIHeaderTmpl;
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_APP_STATUS_INIT_EVENT', 'onAppInitEvent']];
  }

  onAppInitEvent(e) {
    const { initData } = e.payload;
    const { navLinks, header } = initData;
    this.nav$AddNavLinks(navLinks);
    this.nav$OnAppDataEvent(header);
  }

  broadcastEvents() {
    return [['a.logo-link', 'click']];
  }

  onRendered() {
    this.appendView(new UIHeaderHamburgerView());
  }
}
