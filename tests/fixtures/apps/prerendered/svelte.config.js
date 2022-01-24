import adapter from 'svelte-adapter-ghpages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: "/your-repo-name",
		},
		adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
