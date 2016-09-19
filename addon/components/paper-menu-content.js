/**
 * @module ember-paper
 */
import Ember from 'ember';
import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
import { nextTick } from 'ember-css-transitions/mixins/transition-mixin';
const { $ } = Ember;

const MutObserver = self.window.MutationObserver || self.window.WebKitMutationObserver;

function waitForAnimations(element, callback) {
  let computedStyle = window.getComputedStyle(element);
  if (computedStyle.transitionDuration && computedStyle.transitionDuration !== '0s') {
    let eventCallback = function() {
      element.removeEventListener('transitionend', eventCallback);
      callback();
    };
    element.addEventListener('transitionend', eventCallback);
  } else if (computedStyle.animationName !== 'none' && computedStyle.animationPlayState === 'running') {
    let eventCallback = function() {
      element.removeEventListener('animationend', eventCallback);
      callback();
    };
    element.addEventListener('animationend', eventCallback);
  } else {
    callback();
  }
}

/**
 * @class PaperMenuContent
 * @extends ContentComponent
 */
export default ContentComponent.extend({
  animateIn() {
    nextTick().then(() => {
      this.set('isActive', true);
      this.dropdownElement.style.transform = '';
    });
  },

  animateOut(dropdownElement) {
    let parentElement = this.get('renderInPlace') ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
    let clone = dropdownElement.cloneNode(true);
    clone.id = `${clone.id}--clone`;
    let $clone = $(clone);
    parentElement.appendChild(clone);
    nextTick().then(() => {
      if (!this.get('isDestroyed')) {
        this.set('isActive', false);
        $clone.addClass('md-leave');
        waitForAnimations(clone, function() {
          $clone.removeClass('md-active');
          parentElement.removeChild(clone);
        });
      }
    });
  },
  addGlobalEvents() {
    self.window.addEventListener('scroll', this.runloopAwareReposition);
    self.window.addEventListener('resize', this.runloopAwareReposition);
    self.window.addEventListener('orientationchange', this.runloopAwareReposition);
    if (MutObserver) {
      this.mutationObserver = new MutObserver((mutations) => {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
   //       this.runloopAwareReposition();
        }
      });
      this.mutationObserver.observe(this.dropdownElement, { childList: true, subtree: true });
    } else {
      this.dropdownElement.addEventListener('DOMNodeInserted', this.runloopAwareReposition, false);
      this.dropdownElement.addEventListener('DOMNodeRemoved', this.runloopAwareReposition, false);
    }
  }

});