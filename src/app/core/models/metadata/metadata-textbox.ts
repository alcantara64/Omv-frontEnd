import { BaseMetadata } from './metadata-base';

export class TextboxMetadata extends BaseMetadata<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}