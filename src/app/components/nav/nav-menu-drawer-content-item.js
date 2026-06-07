import { ViewStream } from 'spyne';
import MenuDrawerNavTmpl from 'components/nav/templates/nav-menu-drawer-content.tmpl.html';

export class NavMenuDrawerContentItem extends ViewStream {
  constructor(props = {}) {
    props.id = 'menu-drawer-content';
    props.tagName = 'nav';
    props.template = MenuDrawerNavTmpl;

    super(props);
  }

  addActionListeners() {
    return [];
  }

  broadcastEvents() {
    return [
      ['a', 'click']
    ];
  }

  onRendered() {}
}
