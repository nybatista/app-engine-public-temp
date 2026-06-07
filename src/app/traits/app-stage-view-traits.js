import { SpyneTrait } from 'spyne';
import { UIBreadcrumbComponent } from 'components/ui-elements/ui-breadcrumb-component.js';
import { Page404View } from 'components/pages/page-404-view.js';
import { PageView } from 'components/pages/page-view.js';

export class AppStageViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'appStageView$';
    super(context, traitPrefix);
  }

  static appStageView$OnRouteEvent(e, isDeepLink = false) {
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

  static appStageView$OnAppInitEvent(e) {
    this.appStageView$OnRouteEvent(e, true);
  }

  static appStageView$OnRendered() {
    this.appendView(new UIBreadcrumbComponent(), '.slot-page');
  }
}
