import { Logger } from "./Shared/Infrastructure/Logger";

global.debug = Logger.debug;

import App from './App';

const app = new App();

app.init();
