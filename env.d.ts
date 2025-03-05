import "next";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_NOW: string;
		}
	}
}
