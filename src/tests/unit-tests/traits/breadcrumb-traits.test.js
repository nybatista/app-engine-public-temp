import { expect } from 'chai';
import {
  navLinks,
  navLinksDesign,
  payloadHome,
  payloadAbout,
  payloadDesignButtonPrimary,
  payloadCardFlyingTech,
} from '../mocks/route-mocks.js';
import { NavBreadcrumbContainerTraits } from '/src/app/traits/nav/nav-breadcrumb-container-traits.js';
import { NavBreadcrumbViewTraits } from '/src/app/traits/nav/nav-breadcrumb-view-traits.js';
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
  it('should init breadcrumb objects based on navLinks', () => {
    const breadcrumbObjs =
      NavBreadcrumbContainerTraits.navBreadcrumb$getBreadcrumbObjs(navLinks);
  });

  it('should find home visible states', () => {
    const isVisiblePage = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadHome,
      propsPage,
    );

    const isVisibleCard = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadHome,
      propsCard,
    );

    expect(isVisiblePage.isVisible).to.be.false;
    expect(isVisibleCard.isVisible).to.be.false;
  });

  it('should find about visible states', () => {
    const isVisiblePage = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadAbout,
      propsPage,
    );

    const isVisibleCard = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadAbout,
      propsCard,
    );

    expect(isVisiblePage.isVisible).to.be.true;
    expect(isVisibleCard.isVisible).to.be.false;
  });

  it('should find card visible states', () => {
    const isVisiblePage = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadCardFlyingTech,
      propsPage,
    );

    const isVisibleCard = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadCardFlyingTech,
      propsCard,
    );

    expect(isVisiblePage.isVisible).to.be.true;
    expect(isVisibleCard.isVisible).to.be.true;
  });

  it('should find page home active states', () => {
    const isActivePage = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadHome,
      propsPage,
    );

    const isActiveCard = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadHome,
      propsCard,
    );

    expect(isActivePage.isActive).to.be.false;
    expect(isActiveCard.isActive).to.be.false;
  });

  it('should find page about active states', () => {
    const isActivePage = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadAbout,
      propsPage,
    );

    const isActiveCard = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadAbout,
      propsCard,
    );

    expect(isActivePage.isActive).to.be.false;
    expect(isActiveCard.isActive).to.be.false;
  });

  it('should find card  active state', () => {
    const isActivePage = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadCardFlyingTech,
      propsPage,
    );

    const isActiveCard = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadCardFlyingTech,
      propsCard,
    );

    expect(isActivePage.isActive).to.be.true;
    expect(isActiveCard.isActive).to.be.false;
  });

  it('should get page home linkData', () => {
    const bcPageData = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadHome,
      propsPage,
    );

    const bcCardData = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadHome,
      propsCard,
    );

    expect(bcPageData.navLink).to.be.undefined;
    expect(bcCardData.navLink).to.be.undefined;
  });

  it('should get page about linkData', () => {
    const bcPageData = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadAbout,
      propsPage,
    );

    const bcCardData = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadAbout,
      propsCard,
    );

    expect(bcPageData.navLink.title).to.eq('ABOUT');
    expect(bcCardData.navLink).to.be.undefined;
  });

  it('should get card linkData', () => {
    const bcPageData = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadCardFlyingTech,
      propsPage,
    );

    const bcCardData = NavBreadcrumbViewTraits.navBreadcrumbView$GetState(
      payloadCardFlyingTech,
      propsCard,
    );

    expect(bcPageData.navLink.title).to.eq('FLYING CARS');
    expect(bcCardData.navLink.title).to.eq('FLYING TECH');
  });

  it('should return the correct breadcrumb class', () => {
    const isHiddenBC = NavBreadcrumbViewTraits.navBreadcrumbView$getBreadcrumbLinkClass({
      isVisible: false,
      isActive: false,
    });
    const isVisibleBC = NavBreadcrumbViewTraits.navBreadcrumbView$getBreadcrumbLinkClass({
      isVisible: true,
      isActive: false,
    });
    const isVisibleAndActiveBC =
      NavBreadcrumbViewTraits.navBreadcrumbView$getBreadcrumbLinkClass({
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
