export const actions = create();
export const feature = 'sysdig';

export function create(dispatch, validate, fetch, state) {

    return {
        loadData() {
            fetch('/assets/sysdig.json', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
                .then(response => response.json())
                .then(data => dispatch(actions.newData, data));
        },

        newData() {}
    };
}
