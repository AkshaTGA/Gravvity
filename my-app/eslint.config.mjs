import config from "eslint-config-next/core-web-vitals";

const eslintConfig = [
	...config,
	{
		rules: {
			"@next/next/no-img-element": "off",
			"react-hooks/unsupported-syntax": "off",
		},
	},
];

export default eslintConfig;
