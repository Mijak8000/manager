import { simpleGit, SimpleGit } from 'simple-git';
import type { FileDiff } from '../types/index.js';

class GitService {
  private git: SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  async isGitRepository(): Promise<boolean> {
    try {
      await this.git.revparse(['--git-dir']);
      return true;
    } catch {
      return false;
    }
  }

  async getGitRoot(): Promise<string> {
    return this.git.revparse(['--show-toplevel']);
  }

  async getRemoteUrl(remote = 'origin'): Promise<string | null> {
    try {
      const remotes = await this.git.getRemotes(true);
      const found = remotes.find((r) => r.name === remote);
      return found?.refs?.fetch || null;
    } catch {
      return null;
    }
  }

  async extractOrgRepo(): Promise<{ org: string; repo: string } | null> {
    const remoteUrl = await this.getRemoteUrl();
    if (!remoteUrl) return null;

    const patterns = [
      /github\.com[:/]([^/]+)\/([^/.]+)/,
      /gitlab\.com[:/]([^/]+)\/([^/.]+)/,
      /bitbucket\.org[:/]([^/]+)\/([^/.]+)/,
    ];

    for (const pattern of patterns) {
      const match = remoteUrl.match(pattern);
      if (match) {
        return { org: match[1], repo: match[2] };
      }
    }

    return null;
  }

  async getWorkingTreeDiff(): Promise<string> {
    const staged = await this.git.diff(['--cached']);
    const unstaged = await this.git.diff();
    return `${staged}\n${unstaged}`.trim();
  }

  async getStagedDiff(): Promise<string> {
    return this.git.diff(['--cached']);
  }

  async getDiffForCommit(commitSha: string): Promise<string> {
    return this.git.diff([`${commitSha}^`, commitSha]);
  }

  async getDiffForFiles(files: string[]): Promise<string> {
    const diffs: string[] = [];
    
    for (const file of files) {
      const stagedDiff = await this.git.diff(['--cached', '--', file]);
      const unstagedDiff = await this.git.diff(['--', file]);
      
      if (stagedDiff) diffs.push(stagedDiff);
      if (unstagedDiff) diffs.push(unstagedDiff);
    }

    return diffs.join('\n').trim();
  }

  async getModifiedFiles(): Promise<FileDiff[]> {
    const status = await this.git.status();
    const files: FileDiff[] = [];

    const processFile = async (file: string, gitStatus: string): Promise<FileDiff> => {
      let status: FileDiff['status'] = 'modified';
      
      if (gitStatus === 'A' || gitStatus === '?') status = 'added';
      else if (gitStatus === 'D') status = 'deleted';
      else if (gitStatus === 'R') status = 'renamed';

      const diff = await this.git.diff(['--', file]);
      const lines = diff.split('\n');
      
      let additions = 0;
      let deletions = 0;
      
      for (const line of lines) {
        if (line.startsWith('+') && !line.startsWith('+++')) additions++;
        if (line.startsWith('-') && !line.startsWith('---')) deletions++;
      }

      return { file, status, additions, deletions, diff };
    };

    for (const file of status.staged) {
      files.push(await processFile(file, 'M'));
    }

    for (const file of status.modified) {
      if (!files.find((f) => f.file === file)) {
        files.push(await processFile(file, 'M'));
      }
    }

    for (const file of status.not_added) {
      files.push(await processFile(file, 'A'));
    }

    return files;
  }

  async getCurrentBranch(): Promise<string> {
    return this.git.revparse(['--abbrev-ref', 'HEAD']);
  }

  async getHeadCommit(): Promise<string> {
    return this.git.revparse(['HEAD']);
  }
}

export const gitService = new GitService();

