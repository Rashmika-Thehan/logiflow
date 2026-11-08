module.exports = function (options) {
  const origExternals = Array.isArray(options.externals) ? options.externals : [options.externals];

  return {
    ...options,
    externals: [
      function (data, callback) {
        // Do not externalize workspace libraries starting with @app/ — bundle them directly!
        if (data.request && (data.request === '@app/common' || data.request === '@app/contracts' || data.request.startsWith('@app/'))) {
          return callback();
        }
        // Fall back to NestJS default externals for standard 3rd-party dependencies
        for (const ext of origExternals) {
          if (typeof ext === 'function') {
            return ext(data, callback);
          }
        }
        return callback();
      },
    ],
  };
};

