#!/usr/bin/env node

const { paths } = require("common");

require("./templates/build")({
  nameSpaceId: "wald",
  useDevServer: true,
  useBundleAnalyzer: true
});
