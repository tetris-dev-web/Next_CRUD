import { useState, useEffect } from 'react';

import { Link } from 'components';
import { accountService, alertService } from 'services';

export default Index;

function Index() {
	const [accounts, setAccounts] = useState(null);

	useEffect(() => {
		accountService.getAll().then(x => setAccounts(x.data));
	}, []);

	function deleteAccount(id) {
		setAccounts(accounts.map(x => {
			if (x.id === id) { x.isDeleting = true; }
			return x;
		}));
		accountService.delete(id).then((response) => {
			if (response.result == '') {
				alertService.success('Account deleted', { keepAfterRouteChange: true });
				setAccounts(accounts => accounts.filter(x => x.id !== id));
			} else {
				alertService.error(response.message, { keepAfterRouteChange: true });
			}
		});
	}

	return (
		<div>
				<h1>Accounts</h1>
				<Link href="/accounts/add" className="btn btn-sm btn-success mb-2">Add Account</Link>
				<table className="table table-striped">
					<thead>
						<tr>
							<th style={{ width: '20%' }}>Holder</th>
							<th style={{ width: '20%' }}>Number</th>
							<th style={{ width: '20%' }}>Phone</th>
							<th style={{ width: '30%' }}>Notes</th>
							<th style={{ width: '10%' }}></th>
						</tr>
					</thead>
					<tbody>
						{accounts && accounts.map(account =>
							<tr key={account.id}>
								<td>{account.account_holder}</td>
								<td>{account.account_number}</td>
								<td>{account.phone_number}</td>
								<td>{account.notes}</td>
								<td style={{ whiteSpace: 'nowrap' }}>
										<Link href={`/accounts/edit/${account.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
										<button onClick={() => deleteAccount(account.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={account.isDeleting}>
												{account.isDeleting 
														? <span className="spinner-border spinner-border-sm"></span>
														: <span>Delete</span>
												}
										</button>
								</td>
							</tr>
						)}
						{!accounts &&
							<tr>
								<td colSpan="5" className="text-center">
									<div className="spinner-border spinner-border-lg align-center"></div>
								</td>
							</tr>
						}
						{accounts && !accounts.length &&
							<tr>
								<td colSpan="5" className="text-center">
									<div className="p-2">No Accounts To Display</div>
								</td>
							</tr>
						}
					</tbody>
				</table>
		</div>
	);
}
