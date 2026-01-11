import { ViewStream } from 'spyne';
import UIHeaderNavTmpl from './templates/ui-header-nav-view.tmpl.html';
export class UIHeaderNavView extends ViewStream {
  constructor(props = {}) {
    props.class = 'site-nav';
    props.tagName = 'nav';
    props['aria-label'] = 'Main Navigation';
    props.template = UIHeaderNavTmpl;
    props.channels = [
      'CHANNEL_ROUTE',
      'CHANNEL_APP_STATUS',
      'CHANNEL_LOCAL_STORAGE',
    ];
    super(props);
  }

  addActionListeners() {
    // return nested array(s)
    return [
      /*
      ['CHANNEL_ROUTE_.*EVENT', 'onRouteChangeEvent'],
*/
      [
        'CHANNEL_LOCAL_STORAGE_APP_SETTINGS_INITIALIZED_EVENT',
        'onSettingsInit',
      ],

      [
        'CHANNEL_APP_STATUS_INIT_EVENT|CHANNEL_APP_STATUS_DATA_EVENT',
        'onRouteChangeEvent',
      ],

      ['CHANNEL_APP_STATUS_SETTING_EVENT', 'onSettingsEvent'],
    ];
  }

  updateSettingsBtn(type, value) {
    this.props.el$(`[data-settings-type="${type}"]`).el.dataset.settingsValue =
      value;
  }

  onSettingsInit(e) {
    const { theme } = e.payload;
    this.updateSettingsBtn('theme', theme);
  }

  onSettingsEvent(e) {
    const { settingsType, settingsValue } = e.payload;

    // this.props.el$(`[data-settings-type="${settingsType}"]`).el.dataset.settingsValue = settingsValue;
    this.updateSettingsBtn(settingsType, settingsValue);
  }

  onRouteChangeEvent(e) {
    const { routeData, pageId } = e.payload;
    if (routeData === undefined) {
      //   return;
    }

    // const { pageId } = routeData;

    const activeSel = `a.nav[data-page-id='${pageId}']`;
    this.props.el$('a.nav').setActiveItem('selected', activeSel);
  }

  broadcastEvents() {
    // return nested array(s)
    return [
      ['a', 'click'],
      ['button', 'click'],
    ];
  }

  onRendered() {}
}
