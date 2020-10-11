import {
  Installer,
  GitHubReleasesService,
  Octokit
} from '@jbrunton/gha-installer'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'

function createOctokit(): Octokit {
  const token = core.getInput('token')
  if (token) {
    return github.getOctokit(token)
  } else {
    core.warning(
      'No token set, you may experience rate limiting. Set "token: ${{ secrets.GITHUB_TOKEN }}" if you have problems.'
    )
    return new GitHub()
  }
}

async function run(): Promise<void> {
  try {
    const octokit = createOctokit()
    const releasesService = GitHubReleasesService.create(octokit, {
      repo: {owner: 'jbrunton', repo: 'g3ops'},
      assetName: getAssetName
    })
    const installer = Installer.create(releasesService)

    const app = {name: 'g3ops', version: core.getInput('version')}
    return await installer.installApp(app)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function getAssetName(platform: string): string {
  switch (platform) {
    case 'win32':
      throw new Error(`Unsupported OS: Windows`)
    case 'darwin':
      return 'g3ops-darwin-amd64'
    default:
      return 'g3ops-linux-amd64'
  }
}

run()
