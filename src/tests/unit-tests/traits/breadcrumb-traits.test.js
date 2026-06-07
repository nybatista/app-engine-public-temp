import { expect } from 'chai';
import {
  navLinks,
  navLinksDesign,
  payloadHome,
  payloadAbout,
  payloadDesignButtonPrimary,
  payloadCardFlyingTech,
} from '../mocks/route-mocks.js';
import { BreadcrumbTraits } from '/src/app/traits/nav-breadcrumb-view-traits.js';
import { add } from 'ramda';

const propsPage = {
  bcProps: ['pageId'],
  navLevel: 1,
  navLinks: navLinks,
};

const propsCard = {
  bcProps: ['topicId'],
  navLevel: 2,
  navLinks: navLinks,
};

describe('should test that breadrumb traits exists ', () => {
  it('should return hw from breadrumb traits', () => {
    const hw = BreadcrumbTraits.navBreadcrumb$HelloWorld();
    expect(hw).to.eq('Hello World');
  });

  it('should init breadcrumb objects based on navLinks', () => {
    const breadcrumbObjs =
      BreadcrumbTraits.navBreadcrumb$getBreadcrumbObjs(navLinks);
  });

  it('should find home visible states', () => {
    const isVisiblePage = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadHome,
      propsPage,
    );

    const isVisibleCard = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadHome,
      propsCard,
    );

    expect(isVisiblePage.isVisible).to.be.false;
    expect(isVisibleCard.isVisible).to.be.false;
  });

  it('should find about visible states', () => {
    const isVisiblePage = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadAbout,
      propsPage,
    );

    const isVisibleCard = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadAbout,
      propsCard,
    );

    expect(isVisiblePage.isVisible).to.be.true;
    expect(isVisibleCard.isVisible).to.be.false;
  });

  it('should find card visible states', () => {
    const isVisiblePage = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadCardFlyingTech,
      propsPage,
    );

    const isVisibleCard = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadCardFlyingTech,
      propsCard,
    );

    expect(isVisiblePage.isVisible).to.be.true;
    expect(isVisibleCard.isVisible).to.be.true;
  });

  it('should find page home active states', () => {
    const isActivePage = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadHome,
      propsPage,
    );

    const isActiveCard = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadHome,
      propsCard,
    );

    expect(isActivePage.isActive).to.be.false;
    expect(isActiveCard.isActive).to.be.false;
  });

  it('should find page about active states', () => {
    const isActivePage = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadAbout,
      propsPage,
    );

    const isActiveCard = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadAbout,
      propsCard,
    );

    expect(isActivePage.isActive).to.be.false;
    expect(isActiveCard.isActive).to.be.false;
  });

  it('should find card  active state', () => {
    const isActivePage = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadCardFlyingTech,
      propsPage,
    );

    const isActiveCard = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadCardFlyingTech,
      propsCard,
    );

    expect(isActivePage.isActive).to.be.true;
    expect(isActiveCard.isActive).to.be.false;
  });

  it('should get page home linkData', () => {
    const bcPageData = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadHome,
      propsPage,
    );

    const bcCardData = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadHome,
      propsCard,
    );

    expect(bcPageData.navLink).to.be.undefined;
    expect(bcCardData.navLink).to.be.undefined;
  });

  it('should get page about linkData', () => {
    const bcPageData = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadAbout,
      propsPage,
    );

    const bcCardData = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadAbout,
      propsCard,
    );

    expect(bcPageData.navLink.title).to.eq('ABOUT');
    expect(bcCardData.navLink).to.be.undefined;
  });

  it('should get card linkData', () => {
    const bcPageData = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadCardFlyingTech,
      propsPage,
    );

    const bcCardData = BreadcrumbTraits.navBreadcrumb$GetState(
      payloadCardFlyingTech,
      propsCard,
    );

    expect(bcPageData.navLink.title).to.eq('FLYING CARS');
    expect(bcCardData.navLink.title).to.eq('FLYING TECH');
  });

  it('should return the correct breadcrumb class', () => {
    const isHiddenBC = BreadcrumbTraits.navBreadcrumb$getBreadcrumbLinkClass({
      isVisible: false,
      isActive: false,
    });
    const isVisibleBC = BreadcrumbTraits.navBreadcrumb$getBreadcrumbLinkClass({
      isVisible: true,
      isActive: false,
    });
    const isVisibleAndActiveBC =
      BreadcrumbTraits.navBreadcrumb$getBreadcrumbLinkClass({
        isVisible: true,
        isActive: true,
      });

    expect(isHiddenBC).to.eq(
      'breadcrumb-item breadcrumb-item--hidden breadcrumb-item--inactive',
    );
    expect(isVisibleBC).to.eq('breadcrumb-item breadcrumb-item--inactive');
    expect(isVisibleAndActiveBC).to.eq(
      'breadcrumb-item breadcrumb-item--active',
    );
  });
});
