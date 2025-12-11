import { getAssetUrl } from '@/apps/utils';

import classes from './ExamplePage.module.scss';
import { UserApi } from '@/apps/api/user/user.api';

function ExamplePage() {
	const handleTest = async () => {
		const res = await UserApi.test();
		console.log(res);
	};
	return (
		<>
			<div className={classes.examplePage}>
				<span>Example Page</span>
				<img src={getAssetUrl('/images/vector.png')} />
				<button onClick={handleTest}>Test</button>
			</div>
		</>
	);
}

export default ExamplePage;
