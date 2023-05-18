import config from '~/config';

//Layout
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Truyen from '~/pages/Truyen';
import Read from '~/pages/Read';
import Tag from '~/pages/Tag';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.truyen, component: Truyen, layout: HeaderOnly },
    { path: config.routes.tag, component: Tag, layout: HeaderOnly },
    { path: config.routes.read, component: Read, layout: HeaderOnly },
    { path: config.routes.signin, component: Login, layout: null },
    { path: config.routes.signup, component: SignUp, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
