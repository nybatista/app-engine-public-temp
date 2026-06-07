import { ViewStream } from 'spyne';
import { UIBreadcrumbTraits } from 'traits/ui-breadcrumb-traits.js';
import BreadcrumbTmpl from './templates/ui-breadcrumb-view.tmpl.html';
export class UIBreadcrumbView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'li';
    props.class = 'breadcrumb-item';
    props.traits = [UIBreadcrumbTraits];
    props.channels = ['CHANNEL_ROUTE'];
    props.template = BreadcrumbTmpl;
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_ROUTE_.*_EVENT', 'breadcrumb$UpdateLink']];
  }

  broadcastEvents() {
    return [['a', 'click']];
  }

  onRendered() {
    this.breadcrumb$UIBreadcrumbViewOnRendered();
  }
}
