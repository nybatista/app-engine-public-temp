import { ViewStream } from 'spyne';
import { AppStageViewTraits } from 'traits/app-stage-view-traits.js';


export class StageView extends ViewStream {
  constructor(props = {}) {
    props.id = 'stage-view';
    props.traits = [AppStageViewTraits];
    props.channels = ['CHANNEL_APP', 'CHANNEL_ROUTE'];
    props.template = `<div class="slot slot-ui"></div>
                      <div class="slot slot-page  page-container "></div>`;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_APP_INIT_EVENT', 'appStageView$OnAppInitEvent'],
      ['CHANNEL_APP_PAGE_DATA_EVENT', 'appStageView$OnRouteEvent'],
    ];
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {
    this.appStageView$OnRendered();
  }
}
