// This is only for use in CI to set the version number in package.json
// for publishing prerelease versions to npm

const { spawnSync } = require('child_process')
const { writeFileSync, readFileSync } = require('fs')
const semver = require('semver')

const packageJson = JSON.parse(readFileSync('package.json').toString())

const version = semver.valid(
  spawnSync('git', ['describe', '--tags'])
    .stdout.toString()
    .slice(0, -1)
)

if (packageJson.version === version && !process.env.TRAVIS_TAG) {
  // eslint-disable-next-line no-console
  console.error(
    'version generated by `git describe --tags` is the same as' +
      " in package.json but this isn't a release tag"
  )
  process.exit(1)
}
packageJson.version = version
writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n')
