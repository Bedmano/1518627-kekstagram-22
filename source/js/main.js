import { getData, setUserFormSubmit } from './api.js';
import { failToGetAlert } from './util.js';
import './replace-image.js';
import './change-scale.js';
import './filter.js';
import './validate.js';

getData(failToGetAlert);
setUserFormSubmit();
