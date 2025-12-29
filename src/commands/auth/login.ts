import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { authService } from '../../services/auth.service.js';

export async function loginAction(): Promise<void> {
  const spinner = ora();

  try {
    const isAuthenticated = await authService.isAuthenticated();
    
    if (isAuthenticated) {
      const credentials = await authService.getCredentials();
      console.log(chalk.yellow(`\nAlready logged in as ${credentials?.user.email}`));
      
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Do you want to login with a different account?',
          default: false,
        },
      ]);

      if (!confirm) {
        return;
      }
    }

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        validate: (input: string) => {
          if (!input || !input.includes('@')) {
            return 'Please enter a valid email';
          }
          return true;
        },
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        mask: '*',
        validate: (input: string) => {
          if (!input || input.length < 6) {
            return 'Password must be at least 6 characters';
          }
          return true;
        },
      },
    ]);

    spinner.start(chalk.blue('Logging in...'));

    await authService.login(answers.email, answers.password);

    spinner.succeed(chalk.green(`Logged in as ${answers.email}`));

  } catch (error) {
    spinner.fail(chalk.red('Login failed'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
}

