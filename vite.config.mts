import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'Helpers2Impact',
			fileName: (format) => `helpers2impact.${format}.js`,
		},
		rollupOptions: {
			// Assicurati che queste dipendenze siano trattate come peer dependencies
			external: ['react', 'axios', 'js-cookie', 'jwt-decode'],
			output: {
				globals: {
					react: 'React',
					axios: 'axios',
					'js-cookie': 'Cookies',
					'jwt-decode': 'jwt_decode',
				},
			},
		},
	},
	plugins: [dts()]
});