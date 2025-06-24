// global.d.ts
interface HifiRose {
	reLoad: () => void;
}

interface Window {
	HifiRose?: HifiRose;
	parent?: Parent;
}
interface Parent {
	postMessage: (message: string) => void;
	ReactNativeWebView?: {
		postMessage: (message: string) => void;
	};
}