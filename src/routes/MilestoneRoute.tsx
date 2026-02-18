import React from 'react';
import { MilestoneLayout } from '../layouts';

const milestoneModules = import.meta.glob("../components/Milestones/Milestone*/Milestone*.tsx");

export function generateMilestoneRoutes() {
    const routesMap: Record<string, any[]> = {};

    Object.keys(milestoneModules).forEach((path) => {
        const match = path.match(/Milestone(\d+)\/Milestone(\d+)\.tsx$/);
        if (!match) return;

        const group = match[1];
        const child = match[2];

        if (!routesMap[group]) routesMap[group] = [];

        routesMap[group].push({
            path: child,
            element: (() => {
                const Component = React.lazy(milestoneModules[path] as any);
                return (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Component />
                    </React.Suspense>
                );
            })(),
        });
    });

    return Object.entries(routesMap).map(([group, children]) => ({
        path: `milestones/milestone${group}`,
        element: <MilestoneLayout />,
        children: children.sort((a, b) => Number(a.path) - Number(b.path)),
    }));
}
