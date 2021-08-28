import App from './App';
import { Logger } from './Shared/Infrastructure/Logger';

global.debug = Logger.debug;
const app = new App();

app.init();


