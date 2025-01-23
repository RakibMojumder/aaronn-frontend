export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ProjectData {
  projectName: string;
  clientName: string;
  image: string | undefined;
  tags: string[];
  description: ProjectDescription;
}

export interface Project {
  _id: string;
  projectName: string;
  clientName: string;
  image: string | undefined;
  tags: string[];
  description: ProjectDescription;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlockData {
  text?: string;
  level?: number;
  items?: Array<CheckListItem | ListItem>;
  style?: string;
  meta?: Record<string, unknown>;
  counterType?: string;
  content?: string;
  caption?: string;
  alignment?: string;
}

export interface CheckListItem {
  text: string;
  checked: boolean;
}

export interface ListItem {
  content: string;
  meta: Record<string, unknown>;
  items: ListItem[];
}

export interface Block {
  id: string;
  type: "header" | "paragraph" | "checkList" | "list" | "quote";
  data: BlockData;
}

export interface ProjectDescription {
  time: number;
  blocks: Block[];
  version: string;
}
