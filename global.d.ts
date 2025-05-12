// global.d.ts
interface HifiRose {
	reLoad: () => void;
}

interface Window {
	HifiRose?: HifiRose;
	ReactNativeWebView?: {
		postMessage: (message: string) => void;
	};
}
