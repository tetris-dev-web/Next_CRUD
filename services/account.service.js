import { apiUrl } from 'config';
import { fetchWrapper } from 'helpers';

export const accountService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/accounts`;

function getAll() {
	return fetchWrapper.get(baseUrl);
}

function getById(id) {
	return fetchWrapper.get(`${baseUrl}?id=${id}`);
}

function create(params) {
	return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
	params.id = id;
	return fetchWrapper.put(`${baseUrl}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
	let params = {id : id};
	return fetchWrapper.delete(`${baseUrl}`, params);
}
