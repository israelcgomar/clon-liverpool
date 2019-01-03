
import Home from '../app/Ui-Private/UiPrivate';

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/articles",
    component: Home
  },
  {
    path: "/newArticles",
    component: Home
  },
  {
    path: "/all-articles",
    component: Home
  }
];

export default routes;