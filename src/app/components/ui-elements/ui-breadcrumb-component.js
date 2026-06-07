import { ViewStream } from 'spyne';
import { UIBreadcrumbTraits } from 'traits/ui-breadcrumb-traits.js';
import BCTmpl from './templates/ui-breadcrumb-component.tmpl.html';

export class UIBreadcrumbComponent extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'nav';
    props.class = 'breadcrumbs';
    props.template = BCTmpl;
    props.traits = [UIBreadcrumbTraits];

    props.channels = ['CHANNEL_APP', 'CHANNEL_ROUTE'];
    props['aria-label'] = 'breadcrumb';
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_APP_INIT_EVENT', 'breadcrumb$OnAppInitEvent']];
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {}
}
