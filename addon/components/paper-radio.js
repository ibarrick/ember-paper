/**
 * @module ember-paper
 */
import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import ChildMixin from 'ember-paper/mixins/child-mixin';
const { computed, assert } = Ember;

export default BaseFocusable.extend(RippleMixin, ColorMixin, ChildMixin, {
  tagName: 'md-radio-button',
  classNames: ['md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  tabindex: null,

  toggle: false,

  /* Ripple Overrides */
  rippleContainerSelector: '.md-container',
  center: true,
  dimBackground: false,
  fitRipple: true,

  /* BaseFocusable Overrides */
  focusOnlyOnKey: true,

  // Lifecycle hooks
  init() {
    assert('{{paper-radio}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
    this._super(...arguments);
  },

  checked: computed('groupValue', 'value', function() {
    return this.get('groupValue') === this.get('value');
  }),

  click() {
    if (!this.get('disabled')) {
      if (this.get('toggle')) {
        this.sendAction('onChange', this.get('checked') ? null : this.get('value'));
      } else {
        this.sendAction('onChange', this.get('value'));
      }
    }
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  }
});
