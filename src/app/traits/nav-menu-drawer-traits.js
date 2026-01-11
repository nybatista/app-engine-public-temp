import { SpyneTrait, ViewStream } from 'spyne';
import MenuDrawerNavTmpl from 'components/ui-elements/templates/ui-menu-drawer-nav.tmpl.html';

export class NavMenuDrawerTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'menuDrawer$';
    super(context, traitPrefix);
  }

  static menuDrawer$addContent(e) {
    const { navLinks } = e.payload.initData;
    const menuDrawerContent = new ViewStream({
      id: 'menu-drawer-content',
      tagName: 'nav',
      data: navLinks,
      template: MenuDrawerNavTmpl,
    });

    menuDrawerContent.broadcastEvents = () => {
      return [['a', 'click']];
    };

    this.appendView(menuDrawerContent);
    //this.props.el$('.site-title-text').el.innerText = header;
    this.menuDrawer$SetActiveLink(e);
  }

  static menuDrawer$HideNav(hideBool = true, props = this.props) {
    const delayTime = hideBool ? 500 : 100;
    const hideFn = () => props.el$.toggleClass('hide', hideBool);
    this.setTimeout(hideFn, delayTime);
  }

  static menuDrawer$onShowMenuDrawerEvent(e) {
    const { action } = e;
    const showDrawer = action === 'CHANNEL_MENU_DRAWER__SHOW_EVENT';
    this.props.el$.toggleClass('open', showDrawer);
    this.menuDrawer$SetActiveLink(e);
    this.menuDrawer$HideNav(!showDrawer);
  }

  static menuDrawer$SetActiveLink(e) {
    const { routeData } = e.payload;
    if (routeData === undefined) {
      return;
    }

    // this.props.el$('a.nav').el.forEach(e=>e.classList.remove('selected'));

    const { pageId, topicId = '' } = routeData;
    const activeSel = `a.nav[data-page-id='${pageId}'][data-topic-id='${topicId}']`;
    this.props.el$('a.nav').setActiveItem('selected', activeSel);
  }
}
