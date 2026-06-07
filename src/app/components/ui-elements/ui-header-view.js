import { ViewStream } from 'spyne';
import { NavigationTraits } from 'traits/navigation-traits.js';
import UIHeaderTmpl from './templates/ui-header-view.tmpl.html';
import { UIHeaderHamburgerView } from 'components/ui-elements/ui-header-hamburger-view.js';

export class UIHeaderView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'header';
    props.id = 'site-header';
    props.traits = [NavigationTraits];
    props.channels = ['CHANNEL_APP'];
    props.template = UIHeaderTmpl;
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_APP_INIT_EVENT', 'nav$OnAppInitEvent']];
  }

  broadcastEvents() {
    return [['a.logo-link', 'click']];
  }

  onRendered() {
    this.appendView(new UIHeaderHamburgerView());
  }
}
