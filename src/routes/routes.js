import config from '~/config';

//Layout
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Truyen from '~/pages/Truyen';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.truyen, component: Truyen, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
