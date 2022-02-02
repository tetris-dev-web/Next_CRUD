import { AddEdit } from 'components/accounts';
import { accountService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
	const account = await accountService.getById(params.id);

	return {
		props: { account : account.data[0] }
	}
}