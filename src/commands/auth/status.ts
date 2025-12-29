import chalk from 'chalk';
import ora from 'ora';
import { authService } from '../../services/auth.service.js';
import { checkTrialStatus, getTrialIdentifier } from '../../utils/rate-limit.js';

export async function statusAction(): Promise<void> {
  const spinner = ora();

  try {
    const isAuthenticated = await authService.isAuthenticated();

    if (isAuthenticated) {
      const credentials = await authService.getCredentials();
      
      console.log(chalk.bold('\nAuthentication Status\n'));
      console.log(`${chalk.dim('Mode:')}  ${chalk.green('Logged In')}`);
      console.log(`${chalk.dim('Email:')} ${credentials?.user.email}`);
      
      if (credentials?.user.orgs && credentials.user.orgs.length > 0) {
        console.log(`${chalk.dim('Organizations:')}`);
        credentials.user.orgs.forEach((org) => {
          console.log(`  ${chalk.dim('•')} ${org}`);
        });
      }

      const expiresAt = new Date(credentials?.expiresAt || 0);
      const isExpiringSoon = expiresAt.getTime() - Date.now() < 24 * 60 * 60 * 1000;
      
      if (isExpiringSoon) {
        console.log(chalk.yellow('\nNote: Your session will expire soon. Run `kodus auth login` to refresh.'));
      }

    } else {
      spinner.start(chalk.blue('Checking trial status...'));
      
      const trialStatus = await checkTrialStatus();
      
      spinner.stop();

      console.log(chalk.bold('\nAuthentication Status\n'));
      console.log(`${chalk.dim('Mode:')}           ${chalk.yellow('Trial')}`);
      console.log(`${chalk.dim('Reviews today:')} ${trialStatus.reviewsUsed}/${trialStatus.reviewsLimit}`);
      console.log(`${chalk.dim('Files limit:')}   ${trialStatus.filesLimit} per review`);
      console.log(`${chalk.dim('Resets at:')}     ${new Date(trialStatus.resetsAt).toLocaleString()}`);
      
      if (trialStatus.isLimited) {
        console.log(chalk.yellow('\n⚡ Daily limit reached!'));
      }

      console.log(chalk.dim('\nSign up to remove limits: ') + chalk.cyan('kodus auth signup'));
    }

  } catch (error) {
    spinner.fail(chalk.red('Failed to get status'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
}

