import { ViewStream } from 'spyne';
import HamburgerTmpl from './templates/ui-hamburger.tmpl.html';
import { NavMenuDrawerTraits } from 'traits/nav-menu-drawer-traits.js';

export class UIHeaderHamburgerView extends ViewStream {
  constructor(props = {}) {
    props.id = 'menu_toggle';
    props.dataset = {
      eventType: 'menuDrawer',
      isHamburger: 'true',
    };
    props.channels = ['CHANNEL_MENU_DRAWER'];
    props.traits = [NavMenuDrawerTraits];
    props.template = HamburgerTmpl;
    super(props);
  }

  addActionListeners() {
    return [
      [
        'CHANNEL_MENU_DRAWER_.*_EVENT',
        'menuDrawer$UIHeaderHamburgerViewOnShowMenuDrawerEvent',
      ],
    ];
  }

  broadcastEvents() {
    return [['#menu_toggle', 'click']];
  }

  onRendered() {}
}
