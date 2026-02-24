import * as d3 from "d3";
import type { EmotionNode } from "../../lib/types";

export const useSunburst = (
    data: EmotionNode,
    radius: number
) => {
    const root = d3
        .hierarchy<EmotionNode>(data)
        .sum(d => (d.children ? 0 : 1))

    const partition = d3
        .partition<EmotionNode>()
        .size([2 * Math.PI, radius]);

    const partitionedRoot = partition(root) as d3.HierarchyRectangularNode<EmotionNode>;

    const arc = d3
        .arc<d3.HierarchyRectangularNode<EmotionNode>>()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1);

    const nodes = partitionedRoot.descendants() as d3.HierarchyRectangularNode<EmotionNode>[];
    const centerRadius = partitionedRoot.children?.[0]?.y0 ?? 0;

    return { root: partitionedRoot, nodes, arc, centerRadius };
};

export const getNodeColor = (
    node: d3.HierarchyRectangularNode<any>
) => {
    if(!node.parent) return "transparent";

    const topLevel = node.ancestors().find(a => a.depth === 1);

    const baseColor = topLevel?.data.color ?? "#999";

    const color = d3.color(baseColor);
    if(!color) return baseColor;

    const depthFactor = node.depth - 1;
    
    const hsl = d3.hsl(color);

    hsl.l = Math.min(0.75, hsl.l + depthFactor % 2 * 0.12);
    hsl.s = Math.min(0.9, hsl.s - depthFactor % 2 * 0.05);

    return hsl.formatHex();
};

export const getTextTransform = (d: any) => {
    const angle = (d.x0 + d.x1) / 2;
    const radius = (d.y0 + d.y1) / 2;

    const x = Math.cos(angle - Math.PI / 2) * radius;
    const y = Math.sin(angle - Math.PI / 2) * radius;

    const rotate = (angle * 180) / Math.PI - 90 + (angle > Math.PI ? 180 : 0);

    return `translate(${x}, ${y}) rotate(${rotate})`;
};