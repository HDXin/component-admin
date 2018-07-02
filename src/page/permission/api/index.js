import Api from './Api';

export let portalApi = new Api('portal', 'id', {
    updatePasswordApi: {
        url: 'auth/password',
        method: 'put'
    }
});



