import { Router } from './router';

import { AddFeedView } from '../views/AddFeedView/AddFeedView';
import { ConfigureFeedView } from '../views/ConfigureFeedView/ConfigureFeedView';
import { FeedItemView } from '../views/FeedItemView/FeedItemView';
import { FeedView } from '../views/FeedView/FeedView';
import { HomeView } from '../views/HomeView/HomeView';

Router.init({
	baseUrl: import.meta.env.APP_PUBLIC_URL,
	routes: [
		{
			path: '/',
			view: HomeView
		},
		{
			path: '/add-feed',
			view: AddFeedView
		},
		{
			path: '/feed/:id',
			view: FeedView
		},
		{
			path: '/feed/:id/configure',
			view: ConfigureFeedView
		},
		{
			path: '/feed/:id/item/:itemId',
			view: FeedItemView
		}
	]
});
