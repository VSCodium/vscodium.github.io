export type VSCodiumAsset = {
	name: string;
	browser_download_url: string;
	size: number;
	content_type: string;
};

export type VSCodiumRelease = {
	tag_name: string;
	name: string;
	published_at: string;
	body: string;
	assets: VSCodiumAsset[];
};

export type ParsedRelease = {
	version: string;
	publishedAt: string;
	platforms: {
		windows: {
			x64: Record<string, string>;
			arm64: Record<string, string>;
		};
		macos: {
			x64: Record<string, string>;
			arm64: Record<string, string>;
		};
		linux: {
			x64: Record<string, string>;
			arm64: Record<string, string>;
			arm32: Record<string, string>;
			ppc64: Record<string, string>;
			riscv64: Record<string, string>;
			loong64: Record<string, string>;
			s390x: Record<string, string>;
		};
	};
};

export type Quality = 'stable' | 'insider';
