import { SpyneTrait, ViewStream } from 'spyne';
import { UIMenuDrawerNavView } from 'components/ui-elements/ui-menu-drawer-nav-view.js';

export class NavMenuDrawerTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'menuDrawer$';
    super(context, traitPrefix);
  }

  static menuDrawer$addContent(e) {
    const data = e.payload.initData.navLinks;
    this.appendView(new UIMenuDrawerNavView({ data }));
    this.menuDrawer$SetActiveLink(e);
  }

  static menuDrawer$onShowMenuDrawerEvent(e) {
    const { action } = e;
    const showDrawer = action === 'CHANNEL_MENU_DRAWER__SHOW_EVENT';
    this.props.el$.toggleClass('open', showDrawer);
    this.menuDrawer$SetActiveLink(e);
  }

  static menuDrawer$SetActiveLink(e) {
    const { routeData } = e.payload;
    if (routeData === undefined) {
      return;
    }

    const { pageId, topicId = '' } = routeData;
    const activeSel = `a.nav[data-page-id='${pageId}'][data-topic-id='${topicId}']`;
    this.props.el$('a.nav').setActiveItem('selected', activeSel);
  }

  static menuDrawer$UIHeaderHamburgerViewOnShowMenuDrawerEvent(e) {
    const { action } = e;
    const isActiveBurger = action === 'CHANNEL_MENU_DRAWER__SHOW_EVENT';
    this.props.el$.toggleClass('open', isActiveBurger);

  }
}
