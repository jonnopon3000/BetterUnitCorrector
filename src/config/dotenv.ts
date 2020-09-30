import { config, DotenvSafeOptions, DotenvSafeConfigOutput } from 'dotenv-safe';

// TODO unknown why dotenv-safe {config} import registers as <any> according to ESLint
// rather than just switch off no-unsafe-call and/or no-unsafe-member-access for default-import usage, redefine the type for the ConfigFunc here and cast below
// note that this is identical to the typedef in @types/dotenv-safe itself...seems ESLint is screwing up?
type ConfigFunc = (options: DotenvSafeOptions) => DotenvSafeConfigOutput;

/**
 * Load environment variables from /src/.env (templated by /src/.env.example) into the Node process
 * 
 * Required by Node before application launch to ensure availability of vars
 */
(config as ConfigFunc)({
    path: `${__dirname}/../.env`,
    example: `${__dirname}/../.env.example`
});