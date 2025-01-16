import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tree-node',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent {
  @Input() data: any; // Input for tree data passed by the parent component
  expandedNodes: { [key: string]: boolean } = {}; // Track which nodes are expanded

  // Utility method to get keys of the object
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Toggle the expansion state of a node
  toggleNode(key: string): void {
    this.expandedNodes[key] = !this.expandedNodes[key];
  }
}
