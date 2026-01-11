import { ViewStream } from 'spyne';
import { NavBreadcrumbTraits } from 'traits/nav-breadcrumb-traits.js';
import BCTmpl from './templates/ui-breadcrumb-component.tmpl.html';

export class UIBreadcrumbComponent extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'nav';
    props.class = 'breadcrumbs';
    props.template = BCTmpl;
    props.traits = [NavBreadcrumbTraits];

    props.channels = ['CHANNEL_APP_STATUS', 'CHANNEL_ROUTE'];
    props['aria-label'] = 'breadcrumb';
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_APP_STATUS_INIT_EVENT', 'onAppInitEvent']];
  }

  onAppInitEvent(e) {
    const payload = e.payload.initData;
    this.breadcrumb$initBreadcrumbs({ payload });
    // this.designSystem$onRouteEvent(e);
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {}
}
