import * as path from 'path';

import * as express from 'express';
import * as nunjucks from 'nunjucks';

import { convertDate } from '../../utils/convertDate';

export class Nunjucks {
  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const env = nunjucks.configure(path.join(__dirname, '..', '..', 'views'), {
      autoescape: true,
      watch: this.developmentMode,
      express: app,
    });
    env.addFilter('convertDate', convertDate);
    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });
  }
}
