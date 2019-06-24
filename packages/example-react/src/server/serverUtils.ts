// import { logger } from '@nodekit/logger';

// const log = logger('[express-isomorphic-react]');

// export const parseWebpackBuild: ParseWebpackBuild = function parseWebpackBuild({
//   entrypoints,
// }) {
//   log('parseWebpackBuildInfo(): entrypoints:\n%j', entrypoints);

//   const assets: string[] = [];
//   try {
//     if (!entrypoints) {
//       return {
//         assets,
//         error: 'entrypoints undefined',
//       };
//     }

//     Object.values(entrypoints)
//       .forEach((entrypoint: any) => {
//         entrypoint.assets.forEach((asset) => {
//           if (asset.match(/^.*\.(js|css)$/)) {
//             assets.push(asset);
//           }
//         });
//       });

//     return {
//       assets,
//     };
//   } catch (err) {
//     return {
//       assets,
//       error: 'error parsing webpack build info',
//     };
//   }
// };

// interface ParseWebpackBuild {
//   (buildInfo: WebpackBuild): {
//     assets: string[];
//     error?: string;
//   };
// }

// interface WebpackBuild {
//   assets: any[];
//   builtAt: number;
//   entrypoints: {
//     [key: string]: {
//       assets: string[];
//     };
//   };
//   errors: any[];
// }
