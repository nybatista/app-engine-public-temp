import { ViewStream } from 'spyne';
import MenuDrawerTmpl from './templates/ui-menu-drawer.tmpl.html';
import { UIMenuDrawerViewTraits } from 'traits/ui/ui-menu-drawer-view-traits.js';

export class UIMenuDrawerView extends ViewStream {
  constructor(props = {}) {
    props.id = 'menu-drawer';
    props.class = 'menu-drawer';
    props.traits = [UIMenuDrawerViewTraits];

    props.channels = [
      'CHANNEL_ROUTE',
      'CHANNEL_MENU_DRAWER',
      'CHANNEL_APP',
    ];
    props.template = MenuDrawerTmpl;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_MENU_DRAWER_INIT_EVENT', 'uiMenuDrawer$addContent'],
      ['CHANNEL_ROUTE_CHANGE_EVENT', 'uiMenuDrawer$SetActiveLink'],
      ['CHANNEL_MENU_DRAWER__.*_EVENT', 'uiMenuDrawer$onShowMenuDrawerEvent'],
    ];
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {}
}
