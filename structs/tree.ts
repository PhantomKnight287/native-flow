type RemoveChildProps =
  | { id: string; index?: number }
  | { index: number; id?: string };

type GetChildProps = RemoveChildProps;

export class TreeNode {
  name: string;
  id: string;
  properties: Record<string, any> = {};
  children: TreeNode[] = [];
  childrensAllowed: boolean = false;

  constructor(
    name: string,
    id: string,
    childrensAllowed: boolean,
    properties?: Record<string, any>,
    children?: TreeNode[]
  ) {
    this.name = name;
    this.id = id;
    this.childrensAllowed = childrensAllowed;
    this.properties = properties ?? {};
    this.children = children ?? [];
  }

  addChild(childNode: TreeNode, index?: number) {
    if (!(childNode instanceof TreeNode)) {
      throw new Error("Invalid Child Node");
    }
    if (
      typeof index === "number" &&
      (index < 0 || index > this.children.length)
    ) {
      throw new Error("Invalid Index");
    }

    if (typeof index === "number") {
      this.children.splice(index, 0, childNode);
    } else {
      this.children.push(childNode);
    }
  }

  removeChild(props: RemoveChildProps) {
    const { id, index } = props;
    if (index !== undefined && typeof index === "number") {
      if (index < 0 || index >= this.children.length) {
        throw new Error("Invalid Index");
      }
      this.children.splice(index, 1);
    } else if (id !== undefined) {
      const nodeIndex = this.children.findIndex((child) => child.id === id);
      if (nodeIndex !== -1) {
        this.children.splice(nodeIndex, 1);
      }
    } else {
      throw new Error("Neither index nor id provided");
    }
  }

  getChild(props: GetChildProps): TreeNode | null {
    const { id, index } = props;
    if (index !== undefined && typeof index === "number") {
      if (index < 0 || index >= this.children.length) {
        return null;
      }
      return this.children[index];
    } else if (id !== undefined && typeof id === "string") {
      const node = this.children.find((child) => child.id === id);
      return node || null;
    } else {
      return null;
    }
  }
  setProperties(props: Record<string, any>) {
    this.properties = props;
    this.onUpdate(this);
  }

  public onUpdate(prev: TreeNode) {}
}

export class Tree extends TreeNode {}
