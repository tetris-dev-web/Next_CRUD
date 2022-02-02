import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { accountService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
	const account = props?.account;
	const isAddMode = !account;
	const router = useRouter();
	
	// form validation rules 
	const validationSchema = Yup.object().shape({
		account_holder: Yup.string()
			.required('Account Holder is required'),
		account_number: Yup.string()
			.required('Account Number is required'),
		phone_number: Yup.string()
			.required('Phone Number is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	// set default form values if accout passed in props
	if (!isAddMode) {
			const {...defaultValues } = account;
			formOptions.defaultValues = defaultValues;
	}

	// get functions to build form with useForm() hook
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	// Submit event handler
	function onSubmit(data) {
		return isAddMode
			? createAccount(data)
			: updateAccount(account.id, data);
	}

	// Create Account using Service
	function createAccount(data) {
		return accountService.create(data)
			.then((response) => {
				if (response.result == '') {
					alertService.success('Account added', { keepAfterRouteChange: true });
					router.push('/accounts');
				} else {
					alertService.error(response.message, { keepAfterRouteChange: true });
				}
			})
			.catch(alertService.error);
	}

	// Update Account using Service
	function updateAccount(id, data) {
		return accountService.update(id, data)
			.then((response) => {
				if (response.result == '') {
					alertService.success('Account updated', { keepAfterRouteChange: true });
					router.push('/accounts');
				} else {
					alertService.error(response.message, { keepAfterRouteChange: true });
				}
			})
			.catch(alertService.error);
	}

	return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>{isAddMode ? 'Add Account' : 'Edit Account'}</h1>
				<div className="form-row">
					<div className="form-group col-7">
						<label>Holder</label>
						<input name="account_holder" type="text" {...register('account_holder')} className={`form-control ${errors.account_holder ? 'is-invalid' : ''}`} />
						<div className="invalid-feedback">{errors.account_holder?.message}</div>
					</div>	
				</div>
				<div className="form-row">
					<div className="form-group col-7">
						<label>Number</label>
						<input name="account_number" type="text" {...register('account_number')} className={`form-control ${errors.account_number ? 'is-invalid' : ''}`} />
						<div className="invalid-feedback">{errors.account_number?.message}</div>
					</div>	
				</div>
				<div className="form-row">
					<div className="form-group col-7">
						<label>Phone</label>
						<input name="phone_number" type="text" {...register('phone_number')} className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`} />
						<div className="invalid-feedback">{errors.phone_number?.message}</div>
					</div>	
				</div>
				<div className="form-row">
					<div className="form-group col-7">
						<label>Notes</label>
						<textarea name="notes" type="text" {...register('notes')} className={`form-control`} />
					</div>	
				</div>
				<div className="form-group">
					<button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
						{formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
						Save
					</button>
					<button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
					<Link href="/accounts" className="btn btn-link">Cancel</Link>
				</div>
			</form>
	);
}