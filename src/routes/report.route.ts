import { reportController } from '../controllers/report.controller';
import { ReportInputType, ReportOutputType, reportInputSchema, reportOutputSchema } from '../schemas/report.schema';
import { Route } from './index';

const report: Route<ReportInputType, ReportOutputType> = {
  method: 'GET',
  path: '/report',
  schema: {
    input: reportInputSchema,
    output: reportOutputSchema,
  },
  handler: reportController,
  hooks: [
    (req, res, next) => {
      console.log('This is a hook');
      next();
    },
  ],
};

export default [
  report,
];