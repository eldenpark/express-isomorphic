export interface WebpackBuild {
  assets: any[];
  builtAt: number;
  entrypoints: {
    [key: string]: {
      assets: string[];
    };
  };
  errors: any[];
}

export interface WebpackConfig {
  output: {
    [key: string]: any;
  };
  [key: string]: any;
}
