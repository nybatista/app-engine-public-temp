import { ViewStream } from 'spyne';
import { NavigationTraits } from 'traits/navigation-traits.js';
import UIHeaderTmpl from './templates/ui-header-view.tmpl.html';

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
    return [['CHANNEL_APP_INIT_EVENT', 'nav$UIHeaderViewOnAppInitEvent']];
  }

  broadcastEvents() {
    return [['a.logo-link', 'click']];
  }

  onRendered() {
    this.nav$UIHeaderViewOnRendered();
  }
}
