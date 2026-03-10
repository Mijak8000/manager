import { Injectable } from '@nestjs/common';
import {
    BaseLogParams,
    ChangedDataToExport,
    UnifiedLogHandler,
} from './unifiedLog.handler';
import {
    ActionType,
    ConfigLevel,
} from '@libs/core/infrastructure/config/types/general/codeReviewSettingsLog.type';

export interface OrgSettingsLogParams extends BaseLogParams {
    settingKey: string;
    previousValue: any;
    currentValue: any;
}

@Injectable()
export class OrgSettingsLogHandler {
    constructor(private readonly unifiedLogHandler: UnifiedLogHandler) {}

    public async logOrgSettingsChange(
        params: OrgSettingsLogParams,
    ): Promise<void> {
        const changedData = this.generateChangedData(params);

        if (changedData.length === 0) {
            return;
        }

        await this.unifiedLogHandler.saveLogEntry({
            ...params,
            actionType: ActionType.EDIT,
            configLevel: ConfigLevel.GLOBAL,
            repository: undefined,
            changedData,
        });
    }

    private generateChangedData(
        params: OrgSettingsLogParams,
    ): ChangedDataToExport[] {
        const { settingKey, previousValue, currentValue, userInfo } = params;

        switch (settingKey) {
            case 'auto_join_config':
                return this.generateAutoJoinChanges(
                    previousValue,
                    currentValue,
                    userInfo.userEmail,
                );
            case 'timezone_config':
                return this.generateTimezoneChanges(
                    previousValue,
                    currentValue,
                    userInfo.userEmail,
                );
            default:
                return [];
        }
    }

    private generateAutoJoinChanges(
        previous: any,
        current: any,
        userEmail: string,
    ): ChangedDataToExport[] {
        const changes: ChangedDataToExport[] = [];

        const prevEnabled = previous?.enabled ?? false;
        const currEnabled = current?.enabled ?? false;
        const prevDomains: string[] = previous?.domains ?? [];
        const currDomains: string[] = current?.domains ?? [];

        const enabledChanged = prevEnabled !== currEnabled;
        const domainsChanged =
            JSON.stringify(prevDomains.sort()) !==
            JSON.stringify(currDomains.sort());

        if (!enabledChanged && !domainsChanged) {
            return [];
        }

        const parts: string[] = [];

        if (enabledChanged) {
            parts.push(currEnabled ? 'enabled' : 'disabled');
        }

        if (domainsChanged && currDomains.length > 0) {
            parts.push(
                `with domains: ${currDomains.join(', ')}`,
            );
        }

        const action = enabledChanged
            ? currEnabled
                ? 'enabled'
                : 'disabled'
            : 'updated';

        changes.push({
            actionDescription: 'Auto-Join Settings Updated',
            previousValue: {
                enabled: prevEnabled,
                domains: prevDomains,
            },
            currentValue: {
                enabled: currEnabled,
                domains: currDomains,
            },
            description: `User ${userEmail} ${action} Auto-Join${domainsChanged && currDomains.length > 0 ? ` with domains: ${currDomains.join(', ')}` : ''}`,
        });

        return changes;
    }

    private generateTimezoneChanges(
        previous: any,
        current: any,
        userEmail: string,
    ): ChangedDataToExport[] {
        const prevTimezone = previous ?? 'not set';
        const currTimezone = current ?? 'not set';

        if (prevTimezone === currTimezone) {
            return [];
        }

        return [
            {
                actionDescription: 'Timezone Updated',
                previousValue: { timezone: prevTimezone },
                currentValue: { timezone: currTimezone },
                description: `User ${userEmail} changed timezone from ${this.formatTimezone(prevTimezone)} to ${this.formatTimezone(currTimezone)}`,
            },
        ];
    }

    private formatTimezone(tz: string): string {
        if (tz === 'not set') return tz;
        return tz.replace(/_/g, ' ');
    }
}
