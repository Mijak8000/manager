import { formatHeartbeatContext } from './heartbeat-context.util';

describe('formatHeartbeatContext', () => {
    const originalNodeEnv = process.env.API_NODE_ENV;
    const originalComponentType = process.env.COMPONENT_TYPE;

    afterEach(() => {
        process.env.API_NODE_ENV = originalNodeEnv;
        process.env.COMPONENT_TYPE = originalComponentType;
    });

    it('uses API_NODE_ENV as the environment field', () => {
        process.env.API_NODE_ENV = 'production';
        process.env.COMPONENT_TYPE = 'worker';

        const context = formatHeartbeatContext({
            monitor: 'webhook_failure_rate',
        });

        expect(context).toContain('env=production');
        expect(context).toContain('component=worker');
        expect(context).toContain('monitor=webhook_failure_rate');
    });
});
