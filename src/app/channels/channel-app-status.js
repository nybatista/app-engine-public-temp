import { Channel } from 'spyne';
import { AppStatusTraits } from 'traits/app-status-traits.js';
import { AppSettingsTraits } from 'traits/app-settings-traits.js';

export class ChannelAppStatus extends Channel {
  constructor(name, props = {}) {
    name = 'CHANNEL_APP_STATUS';
    props.sendCachedPayload = true;
    props.traits = [AppStatusTraits, AppSettingsTraits];
    super(name, props);
  }

  onRegistered() {
    this.appStatus$GetChannels();

    this.appSettings$InitSettingEvents();
  }

  addRegisteredActions() {
    return [
      'CHANNEL_APP_STATUS_INIT_EVENT',
      'CHANNEL_APP_STATUS_DATA_EVENT',
      'CHANNEL_APP_STATUS_SETTING_EVENT',
    ];
  }

  onViewStreamInfo() {}
}
