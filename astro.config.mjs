// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://gurunkit.teknogain.com',
	integrations: [
		starlight({
			title: 'Gurun Kit',
			favicon: '/favicon.ico',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/teknogain/gurunkit' },
				{ icon: 'seti:favicon', label: 'Author', href: 'https://teknogain.com' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' }
				},
				{
					label: 'Components',
					autogenerate: { directory: 'components' }
				},
				{
					label: 'Utils',
					autogenerate: { directory: 'utils' },
				},
			],
		}),
	],
});
