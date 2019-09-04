/* tslint:disable:no-any */
import { Pipe, PipeTransform } from '@angular/core';
import { pgOptionComponent } from './option.component';

@Pipe({ name: 'OptionPipe' })
export class OptionPipe implements PipeTransform {
  // TODO: enable type checking for this method
  transform(options: pgOptionComponent[], value: any): any {
    if (value.searchText) {
      let _options = options.filter(option => option.Label && (option.Label.toLowerCase().indexOf(value.searchText.toLowerCase()) !== -1));
      if (value.tags) {
        _options = options.filter(option => option.Label && (option.Label.toLowerCase() === value.searchText.toLowerCase()));
      }
      if (_options.length) {
        return _options;
      } else {
        return [ {
          Value   : value.value,
          _value    : value.value,
          Disabled: value.disabled,
          _disabled : value.disabled,
          Label   : value.notFoundContent,
          _label    : value.notFoundContent,
        } as any as pgOptionComponent
      ];
      }
    } else {
      return options;
    }
  }
}
