import App from './App';
import { Logger } from './Shared/Infrastructure/Logger';

global.logger = Logger.debug;
const app = new App();

app.init();


