// inject styles
import './scss/app.scss';

// load spyne
import { SpyneApp, ChannelFetch, SpyneAppProperties } from 'spyne';

// channels
import { ChannelMenuDrawer } from 'channels/channel-menu-drawer';
import { ChannelAppStatus } from 'channels/channel-app-status.js';
import { ChannelLocalStorage } from 'channels/channel-local-storage.js';
//plugins

//data fetch
import AppModelURL from 'data/app.model.json';

// initial view
import { AppView } from './app/app-view.js';

import pageItemTemplateLookup from 'traits/utils/page-item-template-lookup.js';

const config = {
  debug: true,
  storageConfig: {
    storageKey: 'spyneAppStorage',
    analyticsOptions: {},
    theme: 'auto',
    themeDefaults: {
      colorScheme: 'auto',
      enableTransitions: true,
    },
  },

  channels: {
    WINDOW: {
      mediaQueries: {
        showMenuDrawer: `(min-width: 1024px)`,
      },
      events: ['click', 'mouseover', 'message', 'keyup'],

      listenForScroll: true,
      listenForOrientation: true,
      debounceMSTimeForScroll: 50,
    },

    ROUTE: {
      add404s: true,
      routes: {
        routePath: {
          routeName: 'pageId',
          home: '',
          'page-view': {
            routePath: {
              routeName: 'topicId',
              'card-a': 'card-a',
              'card-b': 'card-b',
              'card-c': 'card-c',
            },
          },

          about: 'about',
        },
      },
    },
  },
};

SpyneApp.init(config);

SpyneAppProperties.setProp('pageItemTemplateLookup', pageItemTemplateLookup);
SpyneApp.registerChannel(new ChannelAppStatus());
SpyneApp.registerChannel(new ChannelLocalStorage());
SpyneApp.registerChannel(new ChannelMenuDrawer());

const registerCmsChannels = () => {
  const mapFn = SpyneApp.pluginsFn.mapCmsData || ((d) => d);

  SpyneApp.registerChannel(
    new ChannelFetch('CHANNEL_APP_MODEL', {
      url: AppModelURL,
      map: mapFn,
    }),
  );
};

if (process.env.NODE_ENV === 'development') {
  import('./dev-tools.js').then(({ devToolsReady }) => {
    devToolsReady.then(registerCmsChannels);
  });
} else {
  // production: no CMS, no delay
  registerCmsChannels();
}

new AppView().prependToDom(document.querySelector('body'));
