import { ViewStream } from 'spyne';
import HamburgerTmpl from './templates/ui-hamburger.tmpl.html';
import { NavHamburgerTraits } from 'traits/nav-hamburger-traits.js';

export class UIHeaderHamburgerView extends ViewStream {
  constructor(props = {}) {
    props.id = 'menu_toggle';
    props.dataset = {
      eventType: 'menuDrawer',
      isHamburger: 'true',
    };
    props.channels = ['CHANNEL_MENU_DRAWER'];
    props.traits = [NavHamburgerTraits];
    props.template = HamburgerTmpl;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_MENU_DRAWER_.*_EVENT', 'navHamburger$OnShowMenuDrawerEvent'],
    ];
  }

  broadcastEvents() {
    return [['#menu_toggle', 'click']];
  }

  onRendered() {}
}
