#!/usr/bin/env node

const { paths } = require("../../lib/node");

require("../templates/build")({
  nameSpaceId: "wald",
  useDevServer: true,
  useBundleAnalyzer: true
});
