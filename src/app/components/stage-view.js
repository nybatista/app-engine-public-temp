import { ViewStream } from 'spyne';
import { UIBreadcrumbTraits } from 'traits/ui-breadcrumb-traits.js';
import { UIBreadcrumbComponent } from 'components/ui-elements/ui-breadcrumb-component.js';
import { Page404View } from 'components/pages/page-404-view.js';
import { PageView } from 'components/pages/page-view.js';

export class StageView extends ViewStream {
  constructor(props = {}) {
    props.id = 'stage-view';
    props.traits = [UIBreadcrumbTraits];
    props.channels = ['CHANNEL_APP', 'CHANNEL_ROUTE'];
    props.template = `<div class="slot slot-ui"></div>
                      <div class="slot slot-page  page-container "></div>`;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_APP_INIT_EVENT', 'onAppInitEvent'],
      ['CHANNEL_APP_PAGE_DATA_EVENT', 'onRouteEvent'],
    ];
  }

  onRouteEvent(e, isDeepLink = false) {
    const { pageId, is404 } = e.payload;

    const pageLookupTable = {
      404: Page404View,
    };

    let PageClass = pageLookupTable[pageId] || PageView;

    if (is404) {
      PageClass = Page404View;
    }

    const data = e.payload;

    this.appendView(new PageClass({ data, isDeepLink }), '.page-container');
  }

  onAppInitEvent(e) {
    this.onRouteEvent(e, true);
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {
    this.appendView(new UIBreadcrumbComponent(), '.slot-page');
  }
}
