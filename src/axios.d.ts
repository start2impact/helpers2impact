import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		crossDomain?: boolean;
	}
}