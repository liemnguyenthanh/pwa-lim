const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: true
});

module.exports = withPWA({
  // Your Next.js config
});