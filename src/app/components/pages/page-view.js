import { ViewStream, safeClone, SpyneAppProperties } from 'spyne';
import { PageItemCoreTraits } from 'traits/page-item-core-traits.js';
import { PageItemCustomTraits } from 'traits/page-item-custom-traits.js';
import { HeroView } from 'components/page-items/hero-view.js';
import { CardsContainerView } from 'components/page-items/cards-container-view.js';
import PageTmpl from './templates/page.tmpl.html';

export class PageView extends ViewStream {
  constructor(props = {}) {
    props.class = `page-view page-view-${props?.data?.pageId}`;
    props.channels = [['CHANNEL_ROUTE', true]];
    props.traits = [PageItemCoreTraits, PageItemCustomTraits];
    props.data = safeClone(props.data);
    props.data.href = SpyneAppProperties.getHrefFromData(props.data);
    //props.data.__cms__isProxy = true;
    props.template = PageTmpl;

    super(props);
  }
  addActionListeners() {
    return [['CHANNEL_ROUTE_CHANGE_EVENT', 'disposeViewStream']];
  }

  broadcastEvents() {
    return [['a', 'click']];
  }

  onRendered() {
    const { hero, pageItems, content, pageType } = this.props.data;

    if (hero) {
      this.appendView(new HeroView({ data: hero, pageType }), '.page-heading');
    }

    if (content) {
      this.appendView(
        new CardsContainerView({ data: content, pageType }),
        '.page-body',
      );
    }

    if (pageItems) {
      this.pageItemCore$AddPageItems();
    }
  }
}
