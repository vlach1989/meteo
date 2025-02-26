import "next";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_API_URL_NOW: string;
			NEXT_PUBLIC_API_URL_TODAY: string;
			GOOGLE_DOCS_URL: string;
		}
	}
}
