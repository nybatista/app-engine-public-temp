import { ViewStream } from 'spyne';
import MenuDrawerNavTmpl from 'components/ui-elements/templates/ui-menu-drawer-nav.tmpl.html';

export class UIMenuDrawerNavView extends ViewStream {
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
