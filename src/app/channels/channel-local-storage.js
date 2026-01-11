import { Channel, ChannelPayloadFilter } from 'spyne';
import { AppLocalStorageTraits } from 'traits/app-local-storage-traits.js';

export class ChannelLocalStorage extends Channel {
  constructor(name, props = {}) {
    name = 'CHANNEL_LOCAL_STORAGE';
    props.traits = [AppLocalStorageTraits];
    props.replay = true;
    super(name, props);
  }

  onRegistered() {
    const settinsPayloadFilter = new ChannelPayloadFilter({
      action: 'CHANNEL_APP_STATUS_SETTING_EVENT',
    });

    this.getChannel('CHANNEL_APP_STATUS', settinsPayloadFilter).subscribe(
      this.onStatusSettingsEvent.bind(this),
    );
  }

  onStatusSettingsEvent(e) {
    const { settingsType, settingsValue } = e.payload;

    this.localStorage$SetItem(settingsType, settingsValue);
  }

  addRegisteredActions() {
    return [
      'CHANNEL_LOCAL_STORAGE_APP_SETTINGS_INITIALIZED_EVENT',
      [
        'CHANNEL_LOCAL_STORAGE_UPDATE_KEY_REQUEST',
        'localStorage$onChannelUpdateKeyRequest',
      ],
    ];
  }

  onViewStreamInfo(e) {
    const { payload, action } = e;

    this.sendChannelPayload(action, payload);
  }
}
