import { ViewStream } from 'spyne';
import HamburgerTmpl from './templates/ui-hamburger.tmpl.html';
import { NavHeaderHamburgerItemTraits } from 'traits/nav-header-hamburger-item-traits.js';

export class UIHeaderHamburgerView extends ViewStream {
  constructor(props = {}) {
    props.id = 'menu_toggle';
    props.dataset = {
      eventType: 'menuDrawer',
      isHamburger: 'true',
    };
    props.channels = ['CHANNEL_MENU_DRAWER'];
    props.traits = [NavHeaderHamburgerItemTraits];
    props.template = HamburgerTmpl;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_MENU_DRAWER_.*_EVENT', 'navHeaderHamburgerItem$OnShowMenuDrawerEvent'],
    ];
  }

  broadcastEvents() {
    return [['#menu_toggle', 'click']];
  }

  onRendered() {}
}
