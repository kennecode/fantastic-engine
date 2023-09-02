import habitat from 'preact-habitat';
import 'preact/debug';

import App from './app';

const widget = habitat(App);

widget.render({
  selector: '[data-widget="webform"]',
  clean: true,
});
