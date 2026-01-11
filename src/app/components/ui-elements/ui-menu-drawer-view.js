import { ViewStream } from 'spyne';
import MenuDrawerTmpl from './templates/ui-menu-drawer.tmpl.html';
import { NavMenuDrawerTraits } from 'traits/nav-menu-drawer-traits.js';

export class UIMenuDrawerView extends ViewStream {
  constructor(props = {}) {
    props.id = 'menu-drawer';
    props.class = 'menu-drawer';
    props.traits = [NavMenuDrawerTraits];

    props.channels = [
      'CHANNEL_ROUTE',
      'CHANNEL_MENU_DRAWER',
      'CHANNEL_APP_STATUS',
    ];
    props.template = MenuDrawerTmpl;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_MENU_DRAWER_INIT_EVENT', 'menuDrawer$addContent'],

      ['CHANNEL_ROUTE_CHANGE_EVENT', 'menuDrawer$SetActiveLink'],

      ['CHANNEL_MENU_DRAWER__.*_EVENT', 'menuDrawer$onShowMenuDrawerEvent'],
    ];
  }

  broadcastEvents() {
    // return nested array(s)
    return [];
  }

  onRendered() {}
}
