import chalk from 'chalk';
import type { ReviewResult, ReviewIssue, Severity } from '../types/index.js';

function getSeverityColor(severity: Severity): (text: string) => string {
  switch (severity) {
    case 'error':
      return chalk.red;
    case 'warning':
      return chalk.yellow;
    case 'info':
      return chalk.blue;
    default:
      return chalk.white;
  }
}

function getSeverityIcon(severity: Severity): string {
  switch (severity) {
    case 'error':
      return '✗';
    case 'warning':
      return '⚠';
    case 'info':
      return 'ℹ';
    default:
      return '•';
  }
}

function formatIssue(issue: ReviewIssue, index: number): string {
  const color = getSeverityColor(issue.severity);
  const icon = getSeverityIcon(issue.severity);
  
  const lines: string[] = [];
  
  lines.push(
    `${chalk.dim(`${index + 1}.`)} ${color(icon)} ${chalk.bold(color(issue.severity.toUpperCase()))} ${chalk.dim('in')} ${chalk.cyan(issue.file)}${chalk.dim(`:${issue.line}`)}`
  );
  
  lines.push(`   ${issue.message}`);
  
  if (issue.suggestion) {
    lines.push(chalk.dim(`   Suggestion: `) + chalk.green(issue.suggestion));
  }
  
  if (issue.ruleId) {
    lines.push(chalk.dim(`   Rule: ${issue.ruleId}`));
  }
  
  return lines.join('\n');
}

function formatSummary(result: ReviewResult): string {
  const errorCount = result.issues.filter((i) => i.severity === 'error').length;
  const warningCount = result.issues.filter((i) => i.severity === 'warning').length;
  const infoCount = result.issues.filter((i) => i.severity === 'info').length;

  const parts: string[] = [];
  
  if (errorCount > 0) {
    parts.push(chalk.red(`${errorCount} error${errorCount > 1 ? 's' : ''}`));
  }
  if (warningCount > 0) {
    parts.push(chalk.yellow(`${warningCount} warning${warningCount > 1 ? 's' : ''}`));
  }
  if (infoCount > 0) {
    parts.push(chalk.blue(`${infoCount} info`));
  }

  if (parts.length === 0) {
    return chalk.green('✓ No issues found!');
  }

  return parts.join(chalk.dim(' | '));
}

class TerminalFormatter {
  format(result: ReviewResult): string {
    const lines: string[] = [];

    lines.push('');
    lines.push(chalk.bold('Code Review Results'));
    lines.push(chalk.dim('─'.repeat(50)));
    lines.push('');

    lines.push(`${chalk.dim('Summary:')} ${result.summary}`);
    lines.push(`${chalk.dim('Files analyzed:')} ${result.filesAnalyzed}`);
    lines.push(`${chalk.dim('Duration:')} ${result.duration}ms`);
    lines.push('');
    
    lines.push(formatSummary(result));
    lines.push('');

    if (result.issues.length > 0) {
      lines.push(chalk.bold('Issues'));
      lines.push(chalk.dim('─'.repeat(50)));
      lines.push('');

      result.issues.forEach((issue, index) => {
        lines.push(formatIssue(issue, index));
        lines.push('');
      });
    }

    return lines.join('\n');
  }
}

export const terminalFormatter = new TerminalFormatter();

