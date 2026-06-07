import { SpyneTrait } from 'spyne';

export class NavHamburgerTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'navHamburger$';
    super(context, traitPrefix);
  }

  static navHamburger$OnShowMenuDrawerEvent(e) {
    const { action } = e;
    const isActiveBurger = action === 'CHANNEL_MENU_DRAWER__SHOW_EVENT';
    this.props.el$.toggleClass('open', isActiveBurger);
  }
}
