/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = 'list' | 'range' | 'quick';

export enum LogCategory {
  SYSTEM = 'SYS',
  PATHWAY = 'PATH',
  CALCULATION = 'CALC',
  NODE = 'NODE',
  ERROR = 'ERROR',
}

export interface LogEntry {
  id: string;
  timestamp: string;
  category: LogCategory;
  text: string;
}

export interface DecisionOutcome {
  id: string;
  value: string;
  method: string;
  timestamp: string;
  additionalInfo?: string;
}
