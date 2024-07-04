// global.d.ts
interface HifiRose {
	reLoad: () => void;
}

interface Window {
	HifiRose?: HifiRose;
}
