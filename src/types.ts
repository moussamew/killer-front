export interface Mission {
  id: number;
  content: string;
}

export interface Target {
  id: number;
  name: string;
}

export interface TargetInfos {
  name: string;
  mission: string;
}
