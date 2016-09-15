/**
 * @module ember-paper
 */
import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';
import ValidationMixin from 'ember-paper/mixins/validation-mixin';
import ChildMixin from 'ember-paper/mixins/child-mixin';

const { computed } = Ember;

function concatWithProperty(strings, property) {
  if (property) {
    strings.push(property);
  }
  return strings.join(' ');
}

/**
 * @class PaperSelect
 * @extends PaperInput
 */
export default PowerSelect.extend(ValidationMixin, ChildMixin, {
  tagName: 'md-input-container',
  onchange: computed.alias('onChange'),
  optionsComponent: 'paper-select-options',
  triggerComponent: 'paper-select-trigger',
  searchMessageComponent: 'paper-search-message',
  beforeOptionsComponent: 'paper-select-search',
  focused: false,
  classNameBindings: ['isInvalidAndTouched:md-input-invalid','selected:md-input-has-value', 'focused:md-input-focused'],
  searchEnabled: false,
  validationProperty: 'selected',
  isTouched: false,
  isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),
  didReceiveAttrs() {
    this._super(...arguments);
    this.notifyValidityChange();
  },
  willClearRender() {
    this.sendAction('onValidityChange', false);
  },
  concatenatedTriggerClasses: computed('triggerClass', 'publicAPI.isActive', function() {
    let classes = ['ember-power-select-trigger'];
    if (this.get('isInvalid')) {
      classes.push('ng-invalid');
    }
    if (this.get('isTouched')) {
      classes.push('ng-dirty');
    }
    if (this.get('publicAPI.isActive')) {
      classes.push('ember-power-select-trigger--active');
    }
    return concatWithProperty(classes, this.get('triggerClass'));
  }),
  actions: {
    onClose() {
      this._super(...arguments);
      this.set('isTouched', true);
      this.notifyValidityChange();
    },
    onOpen() {
      this._super(...arguments);
      this.notifyValidityChange();
    }
  },
  focusIn() {
    if (!this.get('disabled') && !this.get('focusOnlyOnKey') || !this.get('pressed')) {
      this.set('focused', true);
    }
  },
  focusOut() {
    this.set('focused', false);
  },
  shouldShowLabel: computed('focused', 'label', 'selected', function() {
    if (this.get('label')) {
      return this.get('focused') || this.get('selected');
    } else {
      return false;
    }
  })
});
