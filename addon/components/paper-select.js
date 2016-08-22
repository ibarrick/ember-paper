/**
 * @module ember-paper
 */
import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';

const { computed } = Ember;

export default PowerSelect.extend({
  tagName: 'md-input-container',
  onchange: computed.alias('onChange'),
  optionsComponent: 'paper-select-options',
  triggerComponent: 'paper-select-value',
  beforeOptionsComponent: 'paper-select-search',
  searchEnabled: false
});
