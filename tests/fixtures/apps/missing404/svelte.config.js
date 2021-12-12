import adapter from 'svelte-adapter-ghpages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
