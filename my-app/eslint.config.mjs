import config from "eslint-config-next/core-web-vitals";

const eslintConfig = [
	...config,
	{
		ignores: [],
		rules: {
			"@next/next/no-img-element": "off",
			"react-hooks/unsupported-syntax": "off",
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/refs": "off",
			"react-hooks/purity": "off",
			"react-hooks/preserve-manual-memoization": "off",
			"react-hooks/immutability": "off",
			"react-hooks/rules-of-hooks": "off",
		},
	},
];

export default eslintConfig;
